# 🔐 Secure Auth + XSS Simulator

> A full-stack cybersecurity educational web application demonstrating real-world authentication security and XSS attack prevention. Built as a BCA Final Year Project.

![Tech Stack](https://img.shields.io/badge/React-18-blue?logo=react)
![Tech Stack](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![Tech Stack](https://img.shields.io/badge/MongoDB-Atlas-brightgreen?logo=mongodb)
![Tech Stack](https://img.shields.io/badge/JWT-Auth-orange?logo=jsonwebtokens)

---

## 📋 Project Overview

**Secure Auth + XSS Simulator** is a cybersecurity educational web app that demonstrates:

1. **Secure Authentication System** — JWT-based login with bcrypt password hashing, role-based access control, and protected routes.
2. **XSS Attack Simulator** — Interactive tool showing how Cross-Site Scripting attacks work and how to prevent them with input sanitization.
3. **Security Learning Module** — Educational content covering XSS, JWT, password hashing, and OWASP Top 10.

---

## ✨ Features

### Authentication
- ✅ User Registration & Login
- ✅ JWT Token-based Authentication
- ✅ bcrypt Password Hashing (10 salt rounds)
- ✅ Role-based Access Control (User/Admin)
- ✅ Password Strength Indicator
- ✅ Protected Routes (client + server side)
- ✅ Session Expiration Handling
- ✅ Secure Error Responses

### XSS Simulator
- ✅ Vulnerable Input Section (demonstrates XSS)
- ✅ Secure Input Section (DOMPurify sanitization)
- ✅ Pre-built Attack Payloads (one-click demos)
- ✅ Real-time Code Analysis
- ✅ Typing Animation for Demo Payloads
- ✅ Educational Explanation Panel

### Security Dashboard
- ✅ User Profile Display
- ✅ Animated Security Statistics
- ✅ Fake Login Attempt Logs (demo data)
- ✅ Security Tips Cards

### UI/UX
- ✅ Dark Cybersecurity Theme
- ✅ Glassmorphism Card Design
- ✅ Framer Motion Animations
- ✅ Responsive Mobile Design
- ✅ Toast Notifications
- ✅ Page Transition Animations
- ✅ Active Route Highlighting

---

## 🛠️ Tech Stack

| Layer          | Technology                        |
| -------------- | --------------------------------- |
| **Frontend**   | React 18, Vite, Tailwind CSS v4   |
| **Animations** | Framer Motion                     |
| **HTTP**       | Axios                             |
| **Backend**    | Node.js, Express.js               |
| **Database**   | MongoDB Atlas (Mongoose ODM)      |
| **Auth**       | JWT (jsonwebtoken) + bcryptjs     |
| **Sanitizer**  | DOMPurify                         |

---

## 📁 Folder Structure

```
secure-auth-xss/
│
├── client/                    # React Frontend
│   ├── src/
│   │   ├── animations/        # Framer Motion variants
│   │   ├── components/        # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── PasswordStrength.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── layouts/           # Layout wrappers
│   │   │   └── MainLayout.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── XSSSimulator.jsx
│   │   │   ├── LearnSecurity.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/          # API & Auth services
│   │   │   ├── api.js
│   │   │   └── authService.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── vite.config.js
│
├── server/                    # Node.js Backend
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js  # Auth logic
│   │   └── dashboardController.js
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT verification
│   ├── models/
│   │   └── User.js            # Mongoose schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── dashboardRoutes.js
│   ├── .env
│   ├── .env.example
│   └── server.js              # Express entry point
│
└── README.md
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18+)
- npm
- MongoDB Atlas account (free tier)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/secure-auth-xss.git
cd secure-auth-xss
```

### 2. Setup Backend
```bash
cd server
npm install
```

Create a `.env` file (or copy from `.env.example`):
```env
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/secureauthxss?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key
PORT=5000
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

Start the backend:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd client
npm install
npm run dev
```

### 4. Open in Browser
Navigate to `http://localhost:5173`

---

## 🔐 Security Concepts Demonstrated

### 1. Password Hashing (bcrypt)
- Passwords are **never stored as plain text**
- bcrypt generates a unique salt for each password
- 10 rounds of hashing make brute-force attacks impractical

### 2. JWT Authentication
- Stateless authentication using signed tokens
- Tokens expire after 7 days
- Server-side middleware verifies every protected request

### 3. XSS Prevention
- React's default JSX escaping prevents most XSS
- DOMPurify sanitizes HTML input by removing dangerous elements
- Content Security Policy headers add another layer

### 4. OWASP Top 10
- Addresses A03 (Injection), A07 (Auth Failures), A02 (Cryptographic), A05 (Misconfig)

---

## 📸 Screenshots

> Add screenshots of your running application here

| Page | Description |
|------|-------------|
| Home | Landing page with hero section |
| Login | Animated login form |
| Signup | Registration with password strength |
| Dashboard | Security stats and logs |
| XSS Simulator | Attack demonstration |
| Learn Security | Educational content |

---

## 🌐 Deployment

### Frontend → Vercel
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repo → Select `client/` as root directory
4. Set env: `VITE_API_URL=https://your-backend-url.com/api`
5. Deploy

### Backend → Render / Railway
1. Go to [render.com](https://render.com) or [railway.app](https://railway.app)
2. Create new Web Service from GitHub
3. Set root directory to `server/`
4. Set environment variables (MONGO_URI, JWT_SECRET, etc.)
5. Deploy

---

## 🔮 Future Improvements

- [ ] Two-Factor Authentication (2FA)
- [ ] Password reset via email
- [ ] Rate limiting for brute-force protection
- [ ] SQL Injection simulator module
- [ ] CSRF attack demonstration
- [ ] Security audit logging to database
- [ ] Admin panel for user management
- [ ] OAuth integration (Google/GitHub)

---

## 🧑‍💻 Author

**BCA Final Year Student**
Cybersecurity Project — 2024

---

## 📄 License

This project is created for educational purposes as part of a BCA cybersecurity curriculum.
