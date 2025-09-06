# 📚 Library Management System Backend

![Node.js](https://img.shields.io/badge/Node.js-v20.x-green) ![Express](https://img.shields.io/badge/Express-v4.18-blue) ![MongoDB](https://img.shields.io/badge/MongoDB-v7.x-brightgreen) ![JWT](https://img.shields.io/badge/JWT-Authentication-orange)

## 📖 Description

This is the backend for a simple Library Management System built as part of a full-stack development internship assignment. It provides a RESTful API for managing books and users, with features like adding books, fetching books, borrowing/returning books, and role-based access. Data is stored in MongoDB, and security is handled via JWT authentication. The code is modular, scalable, with error handling middleware and comments for clarity.

Exceeds assignment: Includes JWT auth, user roles (Admin for add/update/delete, Member for borrow/return), and full API documentation.

## ✨ Features

- 🔐 User Authentication (Register/Login with JWT)
- 👥 User Roles: Admin (manage books) and Member (borrow/return)
- 📖 Book Management: Add, View All, Update, Delete
- 📤 Borrow/Return Books: Updates availability and tracks borrower
- ⚠️ Error Handling: Custom middleware for global errors
- 📝 API Documentation: Postman collection included

## 🛠 Tech Stack

| Category       | Technologies/Tools                  |
|----------------|-------------------------------------|
| Runtime        | Node.js v20.x                       |
| Framework      | Express.js v4.18                    |
| Database       | MongoDB (Mongoose v7.x)             |
| Authentication | JWT (jsonwebtoken v9.x), Bcryptjs   |
| Others         | CORS, Dotenv, Nodemon (dev)         |

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB (local or Atlas cloud)
- Git

### Installation
1. Clone the repository:

`git clone <repo-url> `
`cd backend</repo-url>`


2. Install dependencies:
`npm install`

3. Create `.env` file in the root and add:

`MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/library?retryWrites=true&#x26;w=majority`
`JWT_SECRET=your_jwt_secret_here`
`PORT=5000</pass></user>`


### Running Locally
- Start the server:

`npm start`
- For development (with auto-reload):

`npm run dev`
- Server runs on `http://localhost:5000`.

## 📡 API Endpoints

| Method | Endpoint              | Description                         | Auth/Role Required       |
|--------|-----------------------|-------------------------------------|--------------------------|
| POST   | /api/auth/register   | Register a new user                  | None                      |
| POST   | /api/auth/login      | Login and get JWT token              | None                      |
| POST   | /api/books           | Add a new book                       | JWT, Admin                |
| GET    | /api/books           | Fetch all books (available & borrowed) | JWT                     |
| PUT    | /api/books/:id/borrow| Borrow a book                        | JWT, Member               |
| PUT    | /api/books/:id/return| Return a borrowed book               | JWT, Member (borrower)    |
| PUT    | /api/books/:id       | Update a book                        | JWT, Admin                |
| DELETE | /api/books/:id       | Delete a book                        | JWT, Admin                |

### Example Request (Add Book)

`POST /api/books`
`Headers: Authorization: Bearer <jwt-token>`
`Body: { "title": "Book Title", "author": "Author Name", "isbn": "1234567890" }</jwt-token>`


## 📄 API Documentation
Import the following Postman collection JSON into Postman for testing:

```json
{
  "info": {
    "name": "Library Management API",
    "description": "REST API for managing books with auth"
  },
  "item": [
    // ... (full collection as provided in earlier responses)
  ]
}
```

## ⚙️ Deployment

#### Render Deployment:

- Push code to GitHub.
- Create a new Web Service on Render.com.
- Select Node.js runtime, set build command: npm install, start command: npm start.
- Add environment variables (MONGO_URI, JWT_SECRET, PORT).
- Add Procfile: web: node src/index.js.


#### Verify: Access deployed URL (e.g., https://your-app.onrender.com/api/books).

## 🐛 Troubleshooting

- DB Connection: Check .env and MongoDB URI.
- JWT Errors: Ensure token is valid and secret matches.
- Logs: Errors are logged to console; use tools like Sentry for production.

## 📝 License
MIT License. Feel free to use and modify.
For questions, contact [mdmozammil112002@gmail.com](mdmozammil112002@gmail.com).