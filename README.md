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
  "overview": {
    "title": "Library Management System API",
    "description": "This Postman collection provides API endpoints for a Library Management System, enabling user authentication and book management operations. The collection is organized into two folders: Auth and Books, covering user registration, login, and book-related functionalities like adding, viewing, borrowing, returning, updating, deleting, and searching books.",
    "collection_link": "https://web.postman.co/workspace/My-Workspace~f59fafd6-1a59-486e-8f23-b9e768aa9651/collection/31420548-99d249cf-67ab-4930-908b-b654c78398ae?action=share&source=copy-link&creator=31420548",
    "key_features": [
      {
        "feature": "Authentication",
        "description": "Register and log in users, generating JWT tokens for secure access."
      },
      {
        "feature": "Book Management",
        "description": "Perform CRUD operations on books with role-based access (admin or member)."
      },
      {
        "feature": "Role-Based Access",
        "description": "Admins can add, update, and delete books. Members can view, borrow, return, and search books."
      },
      {
        "feature": "Search Capability",
        "description": "Search books by title and/or author using query parameters."
      }
    ],
    "api_endpoints": {
      "auth_folder": [
        {
          "name": "Register",
          "method": "POST",
          "endpoint": "{{baseURL}}/api/auth/register",
          "description": "Create a new user account."
        },
        {
          "name": "Login",
          "method": "POST",
          "endpoint": "{{baseURL}}/api/auth/login",
          "description": "Authenticate and obtain a JWT token."
        }
      ],
      "books_folder": [
        {
          "name": "Add Book (Admin)",
          "method": "POST",
          "endpoint": "{{baseURL}}/api/books/",
          "description": "Add a new book."
        },
        {
          "name": "View Books",
          "method": "GET",
          "endpoint": "{{baseURL}}/api/books/",
          "description": "List all books (admin or member)."
        },
        {
          "name": "Borrow Book (Member)",
          "method": "PUT",
          "endpoint": "{{baseURL}}/api/books/:id/borrow",
          "description": "Borrow a book by ID."
        },
        {
          "name": "Return Book (Member)",
          "method": "PUT",
          "endpoint": "{{baseURL}}/api/books/:id/return",
          "description": "Return a borrowed book."
        },
        {
          "name": "Update Book (Admin)",
          "method": "PUT",
          "endpoint": "{{baseURL}}/api/books/:id",
          "description": "Update book details."
        },
        {
          "name": "Delete Book (Admin)",
          "method": "DELETE",
          "endpoint": "{{baseURL}}/api/books/:id",
          "description": "Delete a book."
        },
        {
          "name": "Search Books",
          "method": "GET",
          "endpoint": "{{baseURL}}/api/books/?title=<title>&author=<author>",
          "description": "Search books by title and/or author."
        }
      ]
    },
    "setup_instructions": {
      "access_collection": {
        "step": "Open the shared link in Postman after signing in. Fork the collection to your workspace or request access if needed."
      },
      "configure_environment": {
        "step": "Create a Postman environment with variables: `baseURL` (e.g., `http://localhost:5000`) and `token` (JWT token from Login endpoint)."
      },
      "authorization": {
        "step": "Use `Bearer {{token}}` in the Authorization header for protected endpoints."
      },
      "testing_workflow": {
        "step": "Start with Register and Login to create a user and get a token. Test book-related endpoints based on user role. Use query parameters for Search Books."
      }
    },
    "usage_notes": {
      "base_url": "Replace `{{baseURL}}` with your server’s URL (e.g., `http://localhost:5000`).",
      "role_restrictions": {
        "admin": "Add, update, delete books.",
        "member": "Borrow, return books.",
        "both": "View and search books."
      },
      "common_responses": [
        {
          "code": "200 OK",
          "description": "Successful operation."
        },
        {
          "code": "201 Created",
          "description": "Resource created."
        },
        {
          "code": "400 Bad Request",
          "description": "Invalid input."
        },
        {
          "code": "401 Unauthorized",
          "description": "Missing/invalid token."
        },
        {
          "code": "403 Forbidden",
          "description": "Insufficient permissions."
        },
        {
          "code": "404 Not Found",
          "description": "Resource not found."
        }
      ]
    },
    "prerequisites": [
      "Postman (web or desktop).",
      "Access to the Library Management System API server.",
      "User credentials for testing (admin and member roles)."
    ],
    "example_workflow": [
      "Send a POST request to `{{baseURL}}/api/auth/register` to create a user.",
      "Send a POST request to `{{baseURL}}/api/auth/login` to get a JWT token.",
      "Save the token in the `token` environment variable.",
      "Test protected endpoints (e.g., `POST {{baseURL}}/api/books/` for admins or `PUT {{baseURL}}/api/books/:id/borrow` for members).",
      "Use the Search Books endpoint with query parameters to find specific books."
    ],
    "additional_resources": [
      {
        "name": "Postman Documentation",
        "url": "https://learning.postman.com/docs/getting-started/introduction/",
        "description": "For help with collections and environments."
      },
      {
        "name": "Contact Creator",
        "description": "Contact the collection creator (ID: 31420548) for access issues."
      }
    ]
  }
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
