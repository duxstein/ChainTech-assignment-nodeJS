# To-Do List Application

A comprehensive Node.js and Express RESTful API for managing tasks, complete with a clean single-page frontend interface. This project was developed as an intern assignment and explicitly fulfills all core and bonus requirements.

---

## 🚀 Features & Assignment Requirements Met

### 1. Task Management (Core Requirement)
- **Create**: Add tasks with a title and description.
- **Read**: View a list of all existing tasks.
- **Update**: Edit task details, including marking a task as completed.
- **Delete**: Safely remove tasks from the system.

### 2. Data Persistence (Core Requirement)
- **Database**: Uses **MySQL** as the persistent storage layer via the `mysql2/promise` package.
- **Automation**: The application connects to MySQL and automatically executes `CREATE DATABASE` and `CREATE TABLE` upon server startup. No manual SQL scripts are required!

### 3. Validation & Error Handling (Core Requirement)
- **Input Validation**: API rejects task creation or updates if the `title` is empty or missing.
- **Business Logic Rules**: Attempting to mark an already completed task as complete results in a `400 Bad Request` with a meaningful error message.
- **Graceful Error Handling**: All database crashes, not-found IDs (404), and server errors yield standardized JSON error structures instead of terminating the app or returning raw stack traces.

### 4. Setup Options (Bonus Features Included)
- **Due Dates & Categories**: Tasks support optional `dueDate` and `category` fields globally across DB, API, and the GUI.
- **Unit Testing**: Contains a robust automated test suite built with **Jest** and **Supertest** ensuring all logic behaves as expected.

---

## 🛠️ Code Structure & Key Decisions

The project is structured using a modular **MVC (Model-View-Controller)** approach to separate concerns and ensure maintainability:

```text
├── public/                 # Simple Frontend UI files (HTML, CSS, JS)
├── src/                    
│   ├── app.js              # Express app setup, isolated from the network port for easier testing
│   ├── server.js           # Network entry point and database startup trigger
│   ├── controllers/        # Request/Response logic and input validation (`taskController.js`)
│   ├── models/             # Direct database interactions and raw queries (`taskModel.js`)
│   ├── routes/             # API Endpoint definitions (`taskRoutes.js`)
│   └── db/                 # Connection pooling and database bootstrap logic (`database.js`)
├── tests/                  # Automated integration/unit tests using mocked endpoints
├── .env                    # Environment variables (credentials)
└── package.json            # Project dependencies and bash scripts
```

**Key Architectural Decisions:**
1. **Connection Pooling (`mysql2`)**: Ensures we can handle multiple API requests simultaneously without locking up the database connection.
2. **Separation of API vs. Server (`app.js` vs `server.js`)**: Decoupling the Express `app` from the `listen()` call enables us to test endpoints securely using Supertest without opening real background TCP ports.
3. **Mocked Test Database**: The unit tests use `jest.mock()` for the Task model. This ensures the tests validate purely the routing, business logic, and request validation without heavily relying on your local environment's live MySQL instance running perfectly.
4. **Simple Integrated Client UI**: Rather than forcing testing exclusively through Postman or Curl, a vanilla JS frontend sits in `public/` and interacts seamlessly with the API.

---

## 💻 Setup & Installation Instructions

### Prerequisites
- Node.js (v14 or higher)
- **MySQL Server** installed and running locally.

### 1. Install Dependencies
Clone the repository, navigate into the directory, and run:
```bash
npm install
```

### 2. Configure Credentials
Open the `.env` file located in the root folder, and provide your MySQL root password (and adjust the user/host if different).

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
# Add your local mysql password below!
DB_PASSWORD=your_mysql_password
DB_NAME=chaintech_todo
```

### 3. Start the Server
Run the application using:
```bash
npm start
```
*(You will see a log indicating the Database and Table were generated successfully. You do not need to do any manual setup in MySQL Workbench.)*

### 4. Use the Application (Web UI)
Open your browser and navigate to:
**[http://localhost:3000](http://localhost:3000)**

The app serves a beautiful UI from the `/public` directory, allowing you to instantly begin interacting with the database.

---

## 🧪 Running the Unit Tests

To run the automated test suite, simply use:
```bash
npm test
```
This triggers the Jest testing environment. You should immediately see all endpoints passing validation checks, database insertions, and edge cases.

---

## 🌐 API Endpoint Reference

For developers preferring REST tools (like Postman), the base URL is `http://localhost:3000/tasks`.

| Method | Endpoint | Description | JSON Body example |
|---|---|---|---|
| **POST** | `/` | Create a new task | `{ "title": "Buy Milk", "description": "2% please", "category": "Shopping", "dueDate": "2024-12-01" }` |
| **GET** | `/` | Retrieve all tasks | *(None)* |
| **PUT** | `/:id` | Update a task's details | `{ "title": "Buy Soy Milk", "category": "Grocery" }` |
| **PATCH**| `/:id/complete` | Mark task complete | *(None)* |
| **DELETE**| `/:id` | Delete a specific task| *(None)* |
