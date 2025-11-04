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
---
## 📁 Project Structure
```
LifeStack-frontend/
 │
src/
 ├── assets/
 │    └── (All Certificates,Images)
 │
 ├── components/
 │   ├── Auth/
 │   │    ├── Auth.css
 │   │    ├── Login.jsx
 │   │    ├── Logout.jsx
 │   │    ├── ProtectedRoute.jsx
 │   │    └── Signup.jsx
 │   │
 │   ├── Certificates/
 │   │    ├── CertificateForm.jsx
 │   │    ├── CertificateList.jsx
 │   │    └── CertificateView.jsx
 │   │
 │   ├── Courses/
 │   │    ├── CourseForm.jsx
 │   │    ├── CourseList.jsx
 │   │    └── DashboardCourses.jsx
 │   │
 │   ├── Documents/
 │   │    ├── PersonalForm.jsx
 │   │    ├── PersonalList.jsx
 │   │    └── PersonalView.jsx
 │   │
 │   ├── Layout/
 │   │    ├── NavBar.jsx
 │   │    └── NavBar.css
 │   │
 │   └── Home/
 │        ├── HomePage.jsx
 │        └── HomePage.css     
 │
 ├── App.jsx                  
 ├── main.jsx                 
 ├── App.css                   
 └── index.html   
 ```             

---

## User Story


As a user, I want to:

1. Create my own account and be able to log in securely.

2. Upload my certificates and add their details so I can access them later.

3. Download my certificates in PDF format to my personal device.

4. Add future goals or courses that I plan to take in order to track my progress.

5. Edit the information of any certificate or course I have added.

6. Delete a certificate or course that I no longer need.

7. View all my achievements in an organized way, categorized by type (through a dashboard).

8. Search or filter to easily find a specific certificate or course.

9. Access my personal documents in a dedicated section of the website.

10. As an unregistered user, I can only see the Home & About page until I decide to register.

---

## Routing Table

### Public Routes

| Path                        | Component         | Description                |
| --------------------------- | ----------------- | -------------------------- |
| `/home`                     | Home              | Overview for home page     |
| `/login`                    | Login             | User login page            |
| `/signup`                   | Signup            | Create new account for user|


### Protected Routes (Require Login)

| Path                        | Component         | Description                |
| --------------------------- | ----------------- | -------------------------- |
| `/certificate`              | CertificateList   | List all certificates      |
| `/certificate/:id`          | CertificateDetail | View single certificate    |
| `/certificates/new`         | AddCertificate    | Add a new certificate      |
| `/certificates/:id /delete` | DeleteCertificate | Delete specific certificate|
| `/certificates/:id/edit`    | EditCertificate   | Edit specific certificate  |
| `/personal`                 | PersonalList      | List of personal documents |
| `/personal/new`             | AddPersonalDoc    | Add a new Personal document|
| `/personal/:id/edit`        | EditPersonalDoc   | Edit specific Personal docs|
| `/personal/:id /delete`     | DeletePersonalDoc | Delete specific Personal   |
| `/courses`                  | CoursesList       | List all courses (Goals)   |
| `/courses/new`              | AddGoal           | Add a new future Goal      |
| `/courses/:id /delete`      | DeleteGoal        | Delete specific Goal       |
| `/courses/:id/edit`         | EditGoal          | Edit specific Goal         |
| `/courses/dashboard`        | Filtter           | Filtter Goals as dashbord  |

---

## 🧪 Testing

All pages tested locally in Chrome & Edge

Token validation and route protection verified

API calls tested using Postman

--- 
## 🐳 Docker Setup 

# Build and run container

```bash
docker build -t lifestack-frontend .
docker run -p 5173:5173 lifestack-frontend
```


