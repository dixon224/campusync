# CampusSync

CampusSync is a real-time student portal built as a Progressive Web App (PWA) using MongoDB and Redis.  
The platform allows students, teachers, and administrators to manage schedules, receive notifications, communicate through messages, and access academic information in one centralized system.

---

## Project Objective

The objective of CampusSync is to demonstrate how MongoDB and Redis can be combined in a modern full-stack application to provide both persistent storage and real-time communication features.

# Features

## Authentication & Authorization

- JWT authentication using HttpOnly cookies for data safety
- Role-based access:
  - Student
  - Teacher
  - Admin
- Protected routes and dashboards

## Student Features

- View schedules
- Receive announcements and notifications
- Access messages from teachers or administration
- Mobile-first responsive interface

## Teacher Features

- Manage classes and schedules
- Send messages to students
- Access student-related information

## Admin Features

- Manage users and roles
- Send notifications platform-wide
- Manage schedules and classes

## Real-Time System

- Redis-based notification system
- Real-time updates
- Cached frequently accessed data

## Progressive Web App

- Installable on mobile and desktop
- Responsive UI
- Optimized for low-resource environments

---

# Technologies Used

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router DOM

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Redis

## Authentication

- JWT
- HttpOnly Cookies

## File Uploads

- Multer
- Cloudinary

---

# System Architecture

```text
 ┌─────────────────────┐
 │   Frontend (PWA)    │
 │ React + TailwindCSS │
 └──────────┬──────────┘
            │ HTTP Requests
            ▼
 ┌─────────────────────┐
 │    Backend API      │
 │  Node.js + Express  │
 └───────┬─────┬───────┘
         │     │
         │     │
         ▼     ▼
 ┌──────────┐ ┌──────────┐
 │ MongoDB  │ │  Redis   │
 │ Main DB  │ │ Cache &  │
 │           │ │Realtime │
 └──────────┘ └──────────┘
```

# Setup

## Prerequisites

Make sure you have installed:

- Node.js
- MongoDB
- Redis
- Git

## Install Dependencies

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

## Environment Variables

Create a `.env` file in the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
REDIS_URL=your_redis_url
```

# How to Run

## Start Backend

```bash
cd backend
npm run dev
```

## Start Frontend

```bash
cd frontend
npm run dev
```

## Open the Application

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000
```

# Team Members

- SOUARE Ibrahima Sory
- Andika
- Ayxan
