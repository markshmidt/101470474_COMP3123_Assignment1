# COMP3123 Assignment 1 — RESTful API with Node.js, Express, and MongoDB

Student: Mariia Shmidt
Student ID: 101470474
Course: COMP3123 – Full Stack Development
Instructor: Pritesh Patel
Semester: Fall 2025

## Project Overview

This project implements a RESTful API for basic User and Employee Management, using:

- Node.js + Express.js as the backend framework

- MongoDB (Atlas) as the database

- Mongoose as the ODM

- bcryptjs for password hashing

- jsonwebtoken (JWT) for authentication

The backend supports CRUD operations for Employees and Signup/Login for Users, following REST principles and returning appropriate HTTP status codes.


## Project Structure

> This repo uses a single router file and combined controllers for simplicity.

```
.
├─ index.js
├─ .env
├─ package.json
├─ src/
│  ├─ routes.js
│  ├─ controllers.js
│  ├─ validators.js
│  ├─ errorHandler.js
│  └─ auth.js                  # (optional JWT middleware)
└─ models/
   ├─ User.js
   └─ Employee.js
```

---

## Setup

1) **Install dependencies**
```bash
npm install
```

2) **Environment variables** (`.env` in project root)
```bash
MONGODB_URI=mongodb+srv://comp3123user:passwordqwerty1234@comp3123user.i9t2llm.mongodb.net/comp3123user?retryWrites=true&w=majority
PORT=3000
JWT_SECRET=dev-secret-change-me
```

3) **Run**
```bash
npm run dev     # nodemon
# or
npm start       # node index.js
```

Expected logs:
```
MongoDB connected
Server running at http://localhost:3000
```

Health checks:
- `GET /` -> `{ "status": "ok" }`  
- `GET /health/db` -> `{ "ok": true, "state": "connected", "db": "comp3123user" }`

---
