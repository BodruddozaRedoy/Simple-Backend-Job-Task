# 🔐 Login and Registration Backend (TypeScript + Express + MongoDB)

This is a minimal backend application that provides user **registration**, **login**, and a **protected route** using **Node.js**, **Express**, **MongoDB**, and **TypeScript**. Passwords are hashed using `bcrypt`, and authentication is handled using `JWT`.

---

## 🚀 Live API URL

> 📡 [https://simple-backend-job-task.vercel.app/](https://simple-backend-job-task.vercel.app/)


---

## 🧰 Tech Stack

- Node.js + Express.js
- TypeScript
- MongoDB (Mongoose)
- bcrypt for password hashing
- jsonwebtoken for authentication
- ts-node-dev for development
- Deployed on Vercel using `@vercel/node`

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/BodruddozaRedoy/Simple-Backend-Job-Task.git
cd simple-backend-job-task
npm install

PORT=5000
MONGO_URI=
JWT_SECRET=

npm run dev