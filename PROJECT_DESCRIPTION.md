# Project: Web Application for User Authentication and Deal Management

## General Information
This project is a web application designed to manage user authentication processes and display deals. The application includes an open landing page, login, registration, and password reset pages, along with backend integration for data storage in a shared database.

## Project Goals
- Create an adaptive interface using React and Redux.
- Develop an API for processing user data and applications, with storage in a database.
- Ensure mobile-friendly design adaptation.

## Technologies
### Frontend
- **React**: Used for building components and managing page states.
- **Redux**: Applied for centralized state management of authentication (e.g., login success/failure states).
- **React Router**: Provides navigation between pages (/login, /register, /forgot-password, /deals).
- **CSS**: Custom styles for a unique design, adapted for mobile devices.

### Backend
- **Node.js**: Utilizes Express for creating the API server.
- **Supabase**: Provides access to PostgreSQL for storing user data.
- **API Endpoints**:
    - `/api/register`: Registers a new user with password hashing.
    - `/api/login`: Authenticates users and returns status.
    - `/api/forgot-password`: Simulates password reset functionality.