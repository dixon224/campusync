# CampusSync Diagrams

This document contains the Entity Relationship Diagram (ERD) and system flow diagrams used in the CampusSync project.

---

# Entity Relationship Diagram (ERD)

```mermaid
erDiagram

    USER {
        ObjectId _id
        string name
        string email
        string npm
        string password
        string role
        string photo
        date createdAt
        date updatedAt
    }

    CLASS {
        ObjectId _id
        string name
        ObjectId[] teachers
        ObjectId[] students
        date createdAt
        date updatedAt
    }

    SCHEDULE {
        ObjectId _id
        ObjectId class
        ObjectId teacher
        string description
        string classroom
        date startTime
        date endTime
        ObjectId createdBy
        date createdAt
        date updatedAt
    }

    MESSAGE {
        ObjectId _id
        ObjectId sender
        ObjectId[] recipients
        string msg
        date createdAt
        date updatedAt
    }

    USER }o--o{ CLASS : teaches
    USER }o--o{ CLASS : studies_in

    CLASS ||--o{ SCHEDULE : has
    USER ||--o{ SCHEDULE : teaches
    USER ||--o{ SCHEDULE : creates

    USER ||--o{ MESSAGE : sends
    MESSAGE }o--o{ USER : received_by

    USER ||--o{ NOTIFICATION : sends
    NOTIFICATION }o--o{ USER : received_by
```

---

# System Architecture Diagram

```mermaid
flowchart TD

    A[Frontend PWA<br>React + TailwindCSS]
    B[Backend API<br>Node.js + Express]
    C[(MongoDB)]
    D[(Redis)]

    A -->|HTTP Requests| B

    B -->|Persistent Data| C
    B -->|Caching & Realtime| D
```

---

# Authentication Flow

```mermaid
sequenceDiagram

    participant User
    participant Frontend
    participant Backend
    participant MongoDB

    User->>Frontend: Login Request
    Frontend->>Backend: POST /login
    Backend->>MongoDB: Verify User
    MongoDB-->>Backend: User Data
    Backend-->>Frontend: JWT HttpOnly Cookie
    Frontend-->>User: Access Granted
```

---

# Notification Flow

```mermaid
sequenceDiagram

    participant Admin
    participant Backend
    participant Redis
    participant Student

    Admin->>Backend: Send Notification
    Backend->>Redis: Publish Notification
    Redis-->>Student: Real-Time Notification
```

---

# Cache Flow

```mermaid
flowchart LR

    A[Frontend Request]
    B[Backend API]
    C{Redis Cache Available?}
    D[Return Cached Data]
    E[Query MongoDB]
    F[Store Data in Redis]
    G[Return Response]

    A --> B
    B --> C

    C -- Yes --> D
    D --> G

    C -- No --> E
    E --> F
    F --> G
```
