# Task Management System - Backend API

A RESTful API built with Express.js and MongoDB for managing tasks with user authentication.

## Features

- User authentication (Register/Login) with JWT
- CRUD operations for tasks
- Task filtering by status, priority, and search
- Task statistics
- Secure password hashing with bcrypt
- Input validation
- Error handling middleware
- User-specific task management

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

## Project Structure

```
task-management-backend/
├── config/
│   └── database.js          # MongoDB connection configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── taskController.js    # Task CRUD operations
├── middleware/
│   ├── auth.js              # JWT authentication middleware
│   ├── errorHandler.js      # Global error handler
│   └── validate.js          # Validation middleware
├── models/
│   ├── User.js              # User schema
│   └── Task.js              # Task schema
├── routes/
│   ├── authRoutes.js        # Authentication routes
│   └── taskRoutes.js        # Task routes
├── utils/
│   └── generateToken.js     # JWT token generator
├── validators/
│   ├── authValidator.js     # Auth validation rules
│   └── taskValidator.js     # Task validation rules
├── .env                     # Environment variables
├── .env.example             # Environment variables template
├── .gitignore              # Git ignore file
├── package.json            # Dependencies
├── server.js               # Entry point
└── README.md               # Documentation
```

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Step 1: Clone or Download the Project

```bash
cd task-management-backend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory (or rename `.env.example` to `.env`):

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/task_management
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
```

**Important:** Change `JWT_SECRET` to a secure random string in production!

### Step 4: Start MongoDB

Make sure MongoDB is running on your system:

```bash
# For local MongoDB
mongod

# Or use MongoDB Atlas (cloud) - update MONGODB_URI in .env
```

### Step 5: Start the Server

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

Server will start on `http://localhost:5000`

## API Endpoints

### Authentication Routes

#### 1. Register User
- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "jwt_token_here"
  }
}
```

#### 2. Login User
- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "jwt_token_here"
  }
}
```

#### 3. Get Current User
- **URL:** `/api/auth/me`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Task Routes (All Protected - Require Authentication)

#### 1. Get All Tasks
- **URL:** `/api/tasks`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`
- **Query Parameters (Optional):**
  - `status` - Filter by status (To Do, In Progress, Done)
  - `priority` - Filter by priority (Low, Medium, High)
  - `search` - Search in title and description
- **Example:** `/api/tasks?status=To Do&priority=High&search=meeting`
- **Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "...",
      "title": "Complete project",
      "description": "Finish the task management system",
      "status": "In Progress",
      "priority": "High",
      "dueDate": "2024-12-31",
      "user": "...",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### 2. Get Single Task
- **URL:** `/api/tasks/:id`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "Complete project",
    "description": "Finish the task management system",
    "status": "In Progress",
    "priority": "High",
    "dueDate": "2024-12-31"
  }
}
```

#### 3. Create Task
- **URL:** `/api/tasks`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "title": "New Task",
  "description": "Task description",
  "status": "To Do",
  "priority": "Medium",
  "dueDate": "2024-12-31"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "_id": "...",
    "title": "New Task",
    "description": "Task description",
    "status": "To Do",
    "priority": "Medium",
    "dueDate": "2024-12-31"
  }
}
```

#### 4. Update Task
- **URL:** `/api/tasks/:id`
- **Method:** `PUT`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** (Any fields to update)
```json
{
  "status": "Done",
  "priority": "High"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "_id": "...",
    "title": "New Task",
    "status": "Done",
    "priority": "High"
  }
}
```

#### 5. Delete Task
- **URL:** `/api/tasks/:id`
- **Method:** `DELETE`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": {}
}
```

#### 6. Get Task Statistics
- **URL:** `/api/tasks/stats`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
```json
{
  "success": true,
  "data": {
    "total": 10,
    "byStatus": {
      "To Do": 3,
      "In Progress": 4,
      "Done": 3
    },
    "byPriority": {
      "Low": 2,
      "Medium": 5,
      "High": 3
    }
  }
}
```

## Data Models

### User Model
```javascript
{
  name: String (required, max: 50),
  email: String (required, unique, lowercase),
  password: String (required, min: 6, hashed),
  createdAt: Date (auto)
}
```

### Task Model
```javascript
{
  title: String (required, max: 100),
  description: String (optional, max: 500),
  status: String (enum: ['To Do', 'In Progress', 'Done'], default: 'To Do'),
  priority: String (enum: ['Low', 'Medium', 'High'], default: 'Medium'),
  dueDate: Date (optional),
  user: ObjectId (ref: 'User', required),
  createdAt: Date (auto)
}
```

## Authentication

This API uses JWT (JSON Web Tokens) for authentication.

### How to Authenticate:

1. Register or login to get a token
2. Include the token in the Authorization header for protected routes:
   ```
   Authorization: Bearer <your_token_here>
   ```

### Token Expiration:
- Default: 7 days (configurable in .env)

## Error Handling

All errors return a consistent format:

```json
{
  "success": false,
  "message": "Error message here",
  "stack": "Stack trace (only in development)"
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (authentication failed)
- `403` - Forbidden (not authorized)
- `404` - Not Found
- `500` - Internal Server Error

## Testing with Postman/Thunder Client

1. **Register a user** - POST `/api/auth/register`
2. **Login** - POST `/api/auth/login` (save the token)
3. **Create tasks** - POST `/api/tasks` (with token in header)
4. **Get all tasks** - GET `/api/tasks` (with token)
5. **Update task** - PUT `/api/tasks/:id` (with token)
6. **Delete task** - DELETE `/api/tasks/:id` (with token)

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- Protected routes
- User-specific data access
- Error handling without exposing sensitive info

## Development Tips

### For Students Learning:

1. **Understanding MVC Pattern:**
   - Models (`models/`) - Database schemas
   - Controllers (`controllers/`) - Business logic
   - Routes (`routes/`) - API endpoints

2. **Middleware Flow:**
   - Request → Validation → Authentication → Controller → Response

3. **Testing Authentication:**
   - Register → Get token → Use token in headers

4. **Common Issues:**
   - MongoDB not running → Start MongoDB service
   - Token errors → Check Authorization header format
   - Validation errors → Check request body format

## Future Enhancements (For Students)

- Add task categories/tags
- Implement task due date reminders
- Add task sharing between users
- Implement task comments
- Add file attachments to tasks
- Create task templates
- Add email notifications
- Implement password reset functionality

## License

ISC

## Author

MERN Stack Instructor - European IT Institute

---

**Happy Coding! 🚀**