
#       -----------------------   (React)  -------------------------------------

# 🚀 Sagility Trails – Full Stack Application (React)

This project is a React-based frontend application integrated with a backend API.

---

## 📌 Prerequisites

Ensure the following tools are installed:

* Node.js (v14 or above)
* npm or yarn
* Backend API running (e.g., .NET API)

---

## ⚙️ Project Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Aniket-sudo108/Sagility_trails.git
cd Sagility_trails
```

---

## 🔧 Configuration (IMPORTANT)

Before running the application, update the API base URL.

### 📁 File Path:

```bash
sagility_trail_assignment/src/services/api.ts
```

### 🔁 Update this line:

```ts
baseURL: "https://localhost:7240/api"
```

### ✅ Replace with your backend API URL:

Example:

```ts
baseURL: "https://your-api-url/api"
```

> ⚠️ Make sure your backend server is running before starting the frontend.

---

## 📦 Install Dependencies

```bash
npm install
```

---

## ▶️ Run the Application

```bash
npm start
```

App will run on:

```
http://localhost:3000
```

---

## 🔄 API Integration Notes

* All frontend API calls are managed from:

  ```
  src/services/api.ts
  ```
* Ensure:

  * Correct API URL is configured
  * Backend is accessible (no CORS issues)
  * HTTPS/HTTP matches your backend setup

---

## 🏗️ Build for Production

```bash
npm run build
```

Build output will be available in the `build/` folder.

---

## 🧪 Run Tests

```bash
npm test
```

---

## 📁 Project Structure

```
Sagility_trails/
│
├── sagility_trail_assignment/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   ├── services/
│   │   │   └── api.ts   <-- API configuration
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
│
└── README.md
```

---

## 🎯 Features

* Dashboard UI
* API Integration with backend
* Modular architecture
* Error handling
* Responsive design

---

## ⚠️ Common Issues & Fixes

### ❌ API Not Working

* Check backend is running
* Verify `baseURL` is correct
* Check browser console for errors

### ❌ CORS Error

* Enable CORS in backend (e.g., .NET API)

### ❌ Port Conflict

* Change port or stop conflicting app

---

## 👨‍💻 Author

**Aniket Kavathekar**

---

## 📌 Notes

* Always update API URL before running
* Use environment variables (`.env`) for better configuration in production

---
