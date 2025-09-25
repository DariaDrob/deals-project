require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Настройка CSP для устранения предупреждений DevTools
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "default-src 'self'; connect-src 'self' http://localhost:5000 ws://localhost:5000; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'");
    next();
});

// Инициализация Supabase клиента
const supabaseUrl = 'https://yqmlhtvekngeplfhgxxm.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Таблица пользователей в Supabase
const usersTable = 'users';

// Маршрут для корневой страницы (чтобы избежать 404)
app.get('/', (req, res) => {
    res.json({ message: 'API Backend is running! Use /api/deals for deals data.' });
});

// Endpoint для регистрации
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const { data: existingUsers, error: existingError } = await supabase
            .from(usersTable)
            .select('email')
            .eq('email', email)
            .single();

        if (existingError && existingError.code !== 'PGRST116') {
            return res.status(500).json({ error: 'Server error' });
        }
        if (existingUsers) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const { error } = await supabase
            .from(usersTable)
            .insert({ email, password: hashedPassword });

        if (error) {
            return res.status(500).json({ error: 'Server error' });
        }
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Endpoint для логина
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt:', { email }); // Лог для отладки
    try {
        const { data: user, error } = await supabase
            .from(usersTable)
            .select('id, email, password')
            .eq('email', email)
            .single();

        console.log('Supabase user query result:', { user, error }); // Лог результата запроса

        if (error || !user) {
            console.log('User not found or error:', error);
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch); // Лог сравнения пароля

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});
// Эндпоинт для получения данных сделок
app.get('/api/deals', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('deals')
            .select('id, image_url, title, price, yield, sold, Tiket, days_left')
            .limit(4);

        if (error) {
            console.error('Error fetching deals:', error);
            return res.status(500).json({ error: 'Failed to fetch deals' });
        }

        const cleanedData = data.map(item => ({
            id: item.id,
            image_url: item.image_url.replace(/['"]/g, '').trim(),
            title: item.title.replace(/['"]/g, '').trim(),
            price: item.price.replace(/['"]/g, '').trim(),
            yield: item.yield.replace(/['"]/g, '').trim(),
            sold: item.sold.replace(/['"]/g, '').trim(),
            tiket: item.Tiket ? item.Tiket.replace(/['"]/g, '').trim() : 'N/A',
            days_left: item.days_left || 'N/A'
        }));

        res.json(cleanedData);
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});
app.post('/api/forgot-password', async (req, res) => {
    const { email } = req.body;
    console.log('Forgot password request for:', email);
    try {
        const { data: user, error } = await supabase
            .from('users')
            .select('email')
            .eq('email', email)
            .single();
        if (error || !user) {
            return res.status(400).json({ error: 'Email not found' });
        }
        const newPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const { error: updateError } = await supabase
            .from('users')
            .update({ password: hashedPassword })
            .eq('email', email);
        if (updateError) {
            return res.status(500).json({ error: 'Failed to reset password' });
        }
        console.log('New password generated:', newPassword);
        res.json({ message: 'Password reset link sent' });
    } catch (err) {
        console.error('Forgot password error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(5000, () => console.log('Backend on http://localhost:5000'));