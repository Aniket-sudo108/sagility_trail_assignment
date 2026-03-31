# 🚀 WorkVista – Full Stack Application (React + .NET + SQL Server)

This project is a **full-stack application** built using:

* Frontend: React.js
* Backend: .NET Web API
* Database: SQL Server

---

# 📌 Prerequisites

Ensure the following tools are installed:

* Node.js (v14+)
* .NET SDK (6.0+)
* SQL Server
* SQL Server Management Studio (SSMS)
* Visual Studio / VS Code

---

# 🗄️ Database Setup (STEP-BY-STEP)

## 1️⃣ Open SQL Server Management Studio (SSMS)

* Launch **SQL Server Management Studio**
* Connect to your server:

  * Example: `localhost` or `(localdb)\MSSQLLocalDB`

---

## 2️⃣ Open SQL Script File

* Click **File → Open → File**
* Select:

```
WorkVistascript.sql
```

OR

* Copy-paste script into a new query window

---

## 3️⃣ Execute the Script

* Click **Execute** button (or press `F5`)

✔️ This will:

* Create database → `WorkvistaDB`
* Create tables
* Insert initial data (if provided)

---

## 4️⃣ Verify Database Creation

* In SSMS:

  * Expand **Databases**
  * Confirm:

```
WorkvistaDB
```

---

## 5️⃣ Select Database (IMPORTANT)

Before running queries, ensure:

```
USE WorkvistaDB;
```

OR select it from dropdown in SSMS

---

# ⚙️ Backend Setup (.NET API)

## 1️⃣ Configure Connection String

Open:

```
appsettings.json
```

Update:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=.;Database=WorkvistaDB;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

✔️ Ensure:

* Database name matches `WorkvistaDB`
* SQL Server is running

---

## 2️⃣ Run Backend API

### ▶️ Using Visual Studio

* Open solution (`.sln`)
* Press **F5**

### ▶️ Using CLI

```bash
cd WorkVistaAPI
dotnet run
```

---

## 🌐 Backend URL

```
https://localhost:7240
```

API Base URL:

```
https://localhost:7240/api
```

Swagger:

```
https://localhost:7240/swagger
```

---

## 🔗 CORS Configuration

Backend allows React frontend:

```csharp
policy.WithOrigins("http://localhost:3000")
```

---

# ⚛️ Frontend Setup (React)

## 1️⃣ Navigate to Project

```bash
cd sagility_trail_assignment
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Configure API URL (IMPORTANT)

Open:

```
src/services/api.ts
```

Update:

```ts
baseURL: "https://localhost:7240/api"
```

✔️ Ensure it matches backend URL

---

## 4️⃣ Run Frontend

```bash
npm start
```

App runs on:

```
http://localhost:3000
```

---

# 🔄 Application Flow

1. React frontend runs on `localhost:3000`
2. .NET API runs on `localhost:7240`
3. API connects to SQL Server (`WorkvistaDB`)
4. Data flows:

   ```
   React → API → Database
   ```

---

# 📁 Project Structure

```
Sagility_trails/
│
├── sagility_trail_assignment/   # React App
│   ├── src/
│   │   └── services/api.ts
│
├── WorkVistaAPI/               # .NET Backend
│   ├── Controllers/
│   ├── Services/
│   ├── Repositories/
│   ├── Data/
│   ├── Models/
│   ├── appsettings.json
│   └── Program.cs
│
└── WorkVistascript.sql         # Database Script
```

---

# ⚠️ Common Issues & Fixes

## ❌ Script Not Running

* Ensure correct server connection
* Select correct database
* Run using `F5`

---

## ❌ Database Not Found

* Re-run SQL script
* Check spelling: `WorkvistaDB`

---

## ❌ API Not Connecting to DB

* Verify connection string
* Ensure SQL Server is running

---

## ❌ CORS Error

* Ensure frontend URL = `http://localhost:3000`

---

## ❌ HTTPS Certificate Issue

```bash
dotnet dev-certs https --trust
```

---

## ❌ Port Conflict

* Change port in `launchSettings.json`

---

# 🎯 Features

* Dashboard Analytics
* RESTful APIs
* Clean Architecture (Controller → Service → Repository)
* Entity Framework Core
* SQL Server Integration
* React UI

---

# 👨‍💻 Author

**Aniket Kavathekar**

---

# 📌 Final Notes

* Always run SQL script before backend
* Backend must run before frontend
* Keep API URL consistent in frontend

---
