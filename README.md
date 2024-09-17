# Full-Stack React Application
This project is a full-stack web application featuring a React frontend, an Express backend, and a PostgreSQL database. It provides a basic structure for user authentication and task management.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Future Features](#future-features)
- [Technologies](#technologies)
- [Setup Instructions](#setup-instructions)
  - [Frontend](#frontend)
  - [Backend](#backend)

## Project Overview
This project helps manage upcoming appointments and tasks by due date. It includes:
- A React frontend with secure user authentication using JWT and bcrypt.
- An Express backend for handling API requests.
- A PostgreSQL database for storing user information and tasks associated with users.

## Features
- User authentication with login and signup.
- CRUD operations for listing tasks and appointments by due date.
- Data storage in PostgreSQL.

## Future Features
- Show dates in a given range.
- Provide categories for tasks and filter by categories.
- Allow some tasks to recur over a given period.

## Technologies
- **Frontend:** React, react-cookie
- **Backend:** Express, pg, cors, dotenv, uuidv4, bcrypt, jsonwebtoken, nodemon
- **Database:** PostgreSQL

## Setup Instructions for Further Development

### Frontend
1. **Navigate to the Frontend Directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run start
   ```

### Backend
1. **Navigate to the Backend Directory**
   ```bash
   cd backend
   ```

2. **Create a `.env` file in the root directory**
   ```env
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=your_db_name
   JWT_SECRET=your_jwt_secret
   ```
   Note: Currently, the DB root is hardcoded in the `db.js` file.

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start server**
   ```bash
   npm run start
   ```
