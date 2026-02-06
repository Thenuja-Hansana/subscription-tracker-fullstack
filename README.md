# 🚀 Subscription Tracker: Production-Ready Backend System

<div align="center">
  <img src="assets/hero.png" alt="Subscription Tracker Hero" width="100%" style="border-radius: 10px; margin-bottom: 20px;">

  [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
  [![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  [![Arcjet](https://img.shields.io/badge/Shielded_by-Arcjet-7C3AED?style=for-the-badge&logo=shield&logoColor=white)](https://arcjet.com/)
  [![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

  **A modern, scalable, and secure backend platform built with industry-standard practices.**
</div>

---

## 💎 Features at a Glance

- **🛡️ Shielded Architecture**: Integrated with **Arcjet** for bot protection, rate limiting, and request shielding.
- **🔑 Secure Authentication**: Professional JWT-based auth flow with salted & hashed passwords.
- **🔔 Intelligent Notifications**: Automated daily email workflows for renewal reminders.
- **📊 Real-time Dashboard**: A sleek, glassmorphic UI for visual data verification.
- **🏗️ Developer Experience**: Fully containerized with **Docker** and automated with **ESLint/Prettier**.

---

## 🛠️ Tech Stack & Tooling

| Category | Technology |
| :--- | :--- |
| **Core** | Node.js, Express.js (CommonJS) |
| **Database** | MongoDB & Mongoose |
| **Security** | Arcjet, JsonWebToken, Bcrypt.js |
| **Automation** | Node-cron, Nodemailer |
| **DevOps** | Docker, Docker Compose |
| **Quality** | ESLint, Prettier |

---

## 📐 System Architecture

```mermaid
graph TD
    A[Client Dashboard] -->|Protected Routes| B(Express Server)
    B -->|Shielding & Rate Limiting| C{Arcjet}
    C -->|Authorized| D[Subscription API]
    D -->|CRUD Operations| E[(MongoDB)]
    
    F[Cron Engine] -->|Daily Scan| G{Check Reminders}
    G -->|Found Renewal| H[Email Service]
    H -->|SMTP| I[User Inbox]
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18+)
- **Docker** (Optional, for containerized run)
- A **MongoDB Atlas** account (or local MongoDB)

### 2. Installation
```bash
git clone https://github.com/Thenuja-Hansana/subscription-tracker-fullstack.git
cd subscription-tracker
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and add:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
EMAIL_USER=your_email
EMAIL_PASSWORD=your_app_password
```

### 4. Running the App
```bash
# Development Mode
npm run dev

# Professional Formatting
npm run format
npm run lint

# Docker Mode
docker-compose up --build
```

---

## 📜 Development History
This project was built with a disciplined engineering approach, featuring a comprehensive development history spread across various phases of implementation.

<div align="center">
  <sub>Built with ❤️ by Team Antigravity & [User]</sub>
</div>
