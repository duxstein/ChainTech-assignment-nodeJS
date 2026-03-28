# Chaintech Node.js Intern Assignment - To-Do List API

This project is a RESTful API for a To-Do List application. It fulfills all core requirements and includes all bonus features specified in the assignment.

## Features & Requirements Addressed

### Core Functionality 
- **Task Management**: Create, read (list), update, and delete tasks.
- **Persistence**: Data is saved to a **MySQL** database (`todo_app` by default). The app auto-creates the table on boot.
- **Validation**: Ensures task titles are never empty, and prevents a task from being marked as completed if it already is. Graceful API error messages.

### Bonus Features
- **Due Dates & Categories**: Tasks support optional `dueDate` and `category` fields when created or updated.
- **Unit Tests**: Full suite of unit tests for controller logic and routes.

## Code Structure / Key Decisions

- **Express & MVC Architecture**: Divided into `models/`, `controllers/`, and `routes/`. Connects business logic layer separated from HTTP layer.
- **MySQL2 & Connection Pool**: We use `mysql2/promise` with connection pooling to safely handle queries and automatically create the database and task table on launch (so you don't have to manually run SQL commands).
- **Testing**: Using `jest` and `supertest` with mocked database models so the test suite can run instantly without requiring a live, configured database connection.
- **Configurability**: We use a `.env` file for credentials to keep the repository clean and flexible.

## How to Run

### Prerequisites
- Node.js installed
- MySQL Server installed and running locally

### 1. Installation
Clone the repo (or extract the folder), then install dependencies:
```bash
npm install
```

### 2. Configure Database Credentials
Open the `.env` file in the root directory and update it with your MySQL root password (and any other changes):
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=chaintech_todo
```

### 3. Start the Server
Run the project using `npm start` (or `npm run dev` for nodemon):
```bash
npm start
```
*Note: Upon startup, the API will automatically connect to MySQL and execute a `CREATE DATABASE IF NOT EXISTS` and `CREATE TABLE IF NOT EXISTS` statements.*

### 4. Running Unit Tests
You can run the full suite of unit tests directly:
```bash
npm test
```

## API Endpoints Summary

- **POST `/tasks`**: Create a new task.
  - Body: `{ "title": "Buy groceries", "description": "Milk and eggs", "category": "Personal", "dueDate": "2024-12-01" }`
- **GET `/tasks`**: Retrieve all tasks, sorted by newest first.
- **PUT `/tasks/:id`**: Update any fields (`title`, `description`, `dueDate`, `category`) of an existing task.
- **PATCH `/tasks/:id/complete`**: Mark a task as completed. (Returns error if already completed).
- **DELETE `/tasks/:id`**: Safely delete a task from the database.
