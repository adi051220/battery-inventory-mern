# 🔋 Battery Inventory Management System

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application designed to track, manage, and monitor battery inventory levels with secure authentication and inventory status reporting.

---

## 🚀 Tech Stack

* **Frontend:** React.js, Vite, React Router, Tailwind CSS, Axios
* **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT (JSON Web Tokens)

---

## ✨ Features

* **Secure Authentication:** Admin login protected with token-based authentication.
* **Inventory Dashboard:** Table displaying battery tracking IDs, types, and current statuses.
* **Full CRUD Operations:** Add new battery records, edit existing details, and delete entries with confirmation prompts.
* **Status Reports:** Automated summary view aggregating battery counts by status category.

---

## 🛠️ Local Installation & Setup

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* MongoDB or a MongoDB Atlas account
* Git

### 1. Clone the Repository

```bash
git clone https://github.com/adi051220/battery-inventory-mern.git
cd battery-inventory-mern
```

### 2. Backend Setup

Navigate to the backend directory, install dependencies, and start the server:

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder with your configuration:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_key_here
```

Start the backend server:

```bash
npm start
```

### 3. Frontend Setup

Open a second terminal window, navigate to the frontend directory, install dependencies, and start the development server:

```bash
cd frontend
npm install
npm run dev
```

---

## 📂 Project Structure

```text
battery-inventory-mern/
│
├── README.md         # Project documentation
├── backend/          # Express API server, routes, and models
└── frontend/         # React application, components, and views
```
