# General Information

This project is a full-stack web application built to handle user authentication (including login, registration, and password recovery) and display a list of open deals fetched from a backend API. The frontend is developed using React with Redux for state management, and it features responsive design for both desktop and mobile devices. The backend is powered by Node.js with Express, using Supabase (PostgreSQL) for data storage. The application includes an open main page accessible without authentication, user registration with data storage for login, integration with a shared database, pages for authenticated users, and API endpoints for user operations and retrieving deal data. 

The deals data is pulled from a database and displayed in a grid format with details like title, price, yield, sold percentage, ticket size, and days left. Security features include password hashing with bcrypt and JWT for authentication tokens.

# Live Demo

Check out the working version of the application here: [https://dashing-malasada-8c3dc2.netlify.app/](https://dashing-malasada-8c3dc2.netlify.app/)

# Technologies

## Frontend
- **React**: Core library for building interactive components, managing UI states, and handling navigation with React Router.
- **Redux**: Used for global state management, including authentication status and deals data.
- **React Router**: Enables client-side routing for smooth page transitions without full reloads.
- **Tailwind CSS**: Provides utility-first styling for responsive design, including media queries for mobile adaptations.
- **Other**: Fetch API for HTTP requests to the backend, local console logging for debugging.

## Backend
- **Node.js with Express**: Server framework for handling API routes, middleware, and content security policy headers.
- **Supabase**: Integrates with PostgreSQL for database operations. Handles CRUD for users and read-only for deals.
- **bcryptjs**: For secure password hashing and comparison during registration and login.
- **jsonwebtoken (JWT)**: Generates authentication tokens upon successful login.

### API Endpoints
- `GET /`: Root endpoint confirming the API is running.
- `POST /api/register`: Registers a new user, checks for duplicates, hashes password, and inserts into the database.
- `POST /api/login`: Authenticates user credentials, compares hashed passwords, and returns a JWT token if valid.
- `GET /api/deals`: Fetches up to 4 deals from the database, cleans the data, and returns it.
- `POST /api/forgot-password`: Checks if email exists, generates a random new password, hashes it, updates the database, and responds with a success message.
