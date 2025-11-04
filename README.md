# LifeStack Web Application - Frontend

## Project Overview
This is the **frontend** of the LifeStack full stack web application.  
Built with **React (Vite)**, it connects to the Django REST backend to manage user authentication and CRUD operations for certificates, courses, and personal documents.

---
## 💡 Platform Idea :

This project is a personal digital platform that enables users to securely organize and store their certificates, achievements, and future goals in one place. Unlike traditional cloud services, it offers a personalized dashboard to track progress, plan future courses, and access all documents anytime, anywhere in PDF format.

---

## 🚀 Tech Stack
- **React** 19.1
- **Vite** (To Build Tools)
- **React Router DOM**
- **Axios** 1.13
- **Bootstrap** CSS 5.3
- **Framer Motion (Animations)** 12.24
- **JWT Decode** 3.1.2
- **Context API**
- **Docker**

---

## Features
**For User :**
- User Signup / Login / Logout (JWT Authentication)
- CRUD operations for:
  - Certificates
  - Courses (Goals)
  - Personal Documents
- Filtering Goals based on Category  
- Light/Dark Mode UI
- Responsive and modern design
- Error handling for failed API calls
- Dynamic routing with React Router

---

## 🔗 Backend 
- **The frontend communicates with the Django REST API located at**: [http://localhost:8000/]

- **Backend Repository**: [https://github.com/EngTaifAbdullah/LifeStack-backend]

- **Live Demo**:

- **API Documentation** [https://github.com/EngTaifAbdullah/LifeStack-backend/blob/main/README.md]

---

### ⚙️ Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/EngTaifAbdullah/LifeStack-frontend.git
cd LifeStack-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```
