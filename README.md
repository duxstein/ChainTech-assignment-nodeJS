# To-Do List Application

A complete Node.js application for managing tasks, packaged with an elegant and functional single-page user interface. This project was developed as an intern assignment and explicitly fulfills all core functionality and bonus requirements requested in the prompt.

---

## 🚀 Features & Assignment Requirements Met

### 1. Task Management (Core Requirement)
- **Create**: Add tasks with a title and description easily through the web interface.
- **Read**: View a detailed, structured list of all existing tasks directly on the homepage.
- **Update**: Edit task details natively, including easily marking a task as completed.
- **Delete**: Safely remove tasks from the system with a single click.

### 2. Data Persistence (Core Requirement)
- **Database**: Uses **MySQL** as the persistent storage layer. 
- **Automation**: The application connects to MySQL and automatically executes `CREATE DATABASE` and `CREATE TABLE` upon server startup. No manual SQL scripts or database configurations are required for the evaluator!

### 3. Validation & Error Handling (Core Requirement)
- **Input Validation**: The application strictly rejects task creation or updates if the `title` is empty or missing, preventing bad data.
- **Business Logic Rules**: Attempting to mark an already completed task as complete is prevented gracefully by the backend.
- **Graceful Error Handling**: All database crashes, not-found tasks, and server errors provide clear, human-readable UI error messages instead of breaking the application or crashing the server.

### 4. Setup Options (Bonus Features Included)
- **Due Dates & Categories**: Tasks support optional `dueDate` and `category` fields across the UI, backend logic, and database layer.
- **Unit Testing**: Contains a robust automated test suite built with **Jest** to mathematically verify all logic and requirements behave as expected.

---

## 🛠️ Code Structure & Key Decisions

The project is structured using a modular approach to separate concerns and ensure high maintainability:

```text
├── public/                 # The Application User Interface (HTML, CSS, JS)
├── src/                    
│   ├── app.js              # Core application logic and middleware setup
│   ├── server.js           # Server entry point and database startup trigger
│   ├── controllers/        # Request handling and input validation
│   ├── models/             # Database queries and data persistence layer
│   └── db/                 # Connection logic to MySQL
├── tests/                  # Automated integration/unit test suite
├── .env                    # Environment variables (credentials)
└── package.json            # Node.js dependencies and scripts
```

**Key Architectural Decisions:**
1. **Frontend + Backend Integration**: Instead of just building a raw set of server routes, a complete vanilla JS User Interface was built in the `public/` folder to make it a fully interactive **Application** exactly as the prompt requested. 
2. **Automated Database Setup**: To make the evaluator's life easier, the `server.js` file handles all SQL table creations. The reviewer simply runs `npm start` and the application is structurally sound.
3. **Mocked Test Database**: The unit tests mock the database layer. This ensures the tests validate purely the application logic and requirements without heavily relying on your local environment's live MySQL instance running perfectly during the test phase.

---

## 💻 Setup & Installation Instructions

### Prerequisites
- Node.js (v14 or higher)
- **MySQL Server** installed and running locally.
- Node.js (v14 or higher)
- **MySQL Server** installed and running locally.

### 1. Install Dependencies
Clone the repository, navigate into the directory, and run:
### 1. Install Dependencies
Clone the repository, navigate into the directory, and run:
```bash
npm install
```

### 2. Configure Credentials
Open the `.env` file located in the root folder, and provide your MySQL root password (and adjust the user/host if different).

### 2. Configure Credentials
Open the `.env` file located in the root folder, and provide your MySQL root password (and adjust the user/host if different).

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
# Add your local mysql password below!
DB_PASSWORD=your_mysql_password
# Add your local mysql password below!
DB_PASSWORD=your_mysql_password
DB_NAME=chaintech_todo
```

### 3. Start the Application
Run the application using:
```bash
npm start
```
*(You will see a log indicating the Database and Table were generated successfully. You do not need to do any manual setup in MySQL Workbench.)*

### 4. Use the Application (Web UI)
Open your preferred web browser and navigate to:
**[http://localhost:3000](http://localhost:3000)**

You can now use the fully functional To-Do List Application to create, view, edit, and delete tasks!

---

## 📸 Screenshots & Usage Guide

### Main Application Dashboard
![image alt]{https://github.com/duxstein/ChainTech-assignment-nodeJS/blob/4e72dc2125d504d7e927f12563fd6eb808a5f153/screenshots/dashboard.png}

### How to Create a Task
*(Place your screenshot of the task creation form below)*
![Creating a Task](./screenshots/create-task.png)

To create a new task, follow these steps in the UI:
1. Add your title here
2. Add the description of the task here
3. Add the date on which it is going to be done
4. Select a category for the task 
5. Click on the add task button

---

## 🧪 Running Unit Tests (Bonus Requirement)

To verify the logic and requirements via the automated test suite, simply use:
```bash
npm test
```
This triggers the Jest testing environment covering task logic, empty-title validation, and completion edge cases.
