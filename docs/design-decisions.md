# CampusSync Design Decisions

This document explains the main technical decisions made during the development of CampusSync.

---

# 1. MongoDB as Main Database

We think that MongoDB was actually chosen by the teacher as the main database because we could store flexible data. Matter of fact our CampusSync stores flexible data such as users, classes, schedules, and messages.

A document-based database is useful because the structure of educational data can evolve during development.

For example:

- A user can be a student, teacher, or admin.
- A class can contain multiple students and multiple teachers.
- A schedule can reference a class, a teacher, and the user who created it.

MongoDB works well with this structure because documents can contain references and flexible fields.

---

# 2. Mongoose for Data Modeling

Mongoose was used to define schemas and relationships between collections.

This helps keep the database organized and makes the backend code easier to maintain.

Main models:

- User
- Class
- Schedule
- Message

---

# 3. Redis for Cache and Real-Time Features

Redis was selected to improve performance and support real-time behavior.

In CampusSync, Redis can be used for:

- caching frequently requested data
- real-time notifications
- publish/subscribe communication
- temporary data storage

MongoDB stores long-term data, while Redis handles fast temporary operations.

---

# 4. Express.js Backend API

Express.js was chosen for the backend because it is lightweight and simple to organize.

The backend is responsible for:

- authentication
- role-based authorization
- database communication
- API routing
- message management
- class and schedule management
- notification management (To be added)

---

# 5. JWT Authentication with HttpOnly Cookies

CampusSync uses JWT authentication stored in HttpOnly cookies.

This design was chosen because HttpOnly cookies cannot be directly accessed by JavaScript in the browser, which helps reduce security risks related to token theft.

The authentication flow is:

1. User logs in.
2. Backend verifies credentials.
3. Backend sends a JWT inside an HttpOnly cookie.
4. Frontend calls protected routes using `withCredentials: true`.

---

# 6. Role-Based Access Control

CampusSync has three main roles:

- student
- teacher
- admin

Each role has different permissions.

Examples:

- Students can view schedules and messages and join existing classes.
- Teachers can manage classes and send messages to students.
- Admins can manage users, classes, schedules, and messages.

This keeps the application organized and prevents unauthorized actions.

---

# 7. React + Vite Frontend

React was selected for the frontend because it makes it easier to build reusable UI components.

Vite was chosen because it provides a fast development environment and quick reloads during development.

The frontend is organized around:

- pages
- components
- context
- protected routes
- services

---

# 8. Tailwind CSS for UI Design

Tailwind CSS was used to create a responsive and mobile-first interface.

The design uses:

- rounded white cards
- yellow background
- simple spacing
- mobile-friendly layouts

This keeps the interface consistent across the application.

---

# 9. Progressive Web App

CampusSync is designed as a Progressive Web App so it can behave more like a mobile application.

The PWA approach allows:

- installation on mobile or desktop
- better user experience
- responsive design
- offline-ready architecture in the future

---

# 10. Cloudinary for Image Uploads

Cloudinary was used to store UI ID cards.

This avoids storing images directly inside the backend server and allows image URLs to be saved inside MongoDB.

The upload flow is:

1. User selects a profile image.
2. Multer receives the file.
3. Backend uploads it to Cloudinary.
4. Cloudinary returns a secure URL.
5. The URL is stored in MongoDB.

---

# 11. Separate Frontend and Backend

The project is separated into frontend and backend folders.

This decision makes the project easier to maintain because:

- frontend code is isolated from backend code
- dependencies are separated
- each part can be developed independently
- Docker can run both services separately

---

# 12. Benchmarking Strategy

Benchmarks are included to evaluate the performance of the system.

The benchmark folder contains:

- scripts
- raw CSV/JSON results
- plots

Current benchmarks measure MongoDB query performance.  
Future benchmarks will compare MongoDB queries with Redis cached responses.

---

# 13. Future Improvements

Possible future improvements include:

- Redis cache integration for schedules and messages
- real-time notifications
- WebSocket support
- better admin analytics
- attendance management
- assignment management
