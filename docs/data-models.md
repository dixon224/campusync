# CampusSync Data Models

CampusSync uses MongoDB as the main database.  
The application stores users, classes, schedules, and messages as flexible documents.

---

# User Model

The User model represents all users of the platform: students, teachers, and administrators.

## Fields

| Field     | Type   | Description                                |
| --------- | ------ | ------------------------------------------ |
| name      | String | Full name of the user                      |
| email     | String | Unique email used for login                |
| npm       | String | Unique npm used for login for the students |
| password  | String | Hashed password                            |
| role      | String | User role: student, teacher, or admin      |
| photo     | String | Profile picture URL stored with Cloudinary |
| createdAt | Date   | Date of account creation                   |
| updatedAt | Date   | Date of last update                        |

## Example

```json
{
  "_id": "user_id",
  "name": "John Doe",
  "npm": "2506698030",
  "email": "john@example.com",
  "role": "student",
  "photo": "https://cloudinary.com/profile.jpg"
}
```

---

# Class Model

The Class model represents a school class or group managed by a teacher.

## Fields

| Field     | Type            | Description                             |
| --------- | --------------- | --------------------------------------- |
| name      | String          | Name of the class                       |
| teacher   | Array<ObjectId> | List of teacher users assigned to class |
| students  | Array<ObjectId> | List of student users assigned to class |
| createdAt | Date            | Date of class creation                  |

## Example

```json
{
  "_id": "class_id",
  "name": "Computer Science A",
  "teachers": ["teacher_user_id_1", "teacher_user_id_2"]
  "students": ["student_user_id_1", "student_user_id_2"]
}
```

---

# Schedule Model

The Schedule model stores course planning information for students and teachers.

## Fields

| Field | Type | Description |
| ----- | ---- | ----------- |

| class | ObjectId | Reference to the related class |
| teacher | ObjectId | Reference to the teacher user |
| description | String | Course or event title |
| startTime | String | Starting Date of the course |
| endTime | String | Ending Date of the course |
| room | String | Classroom or course location |
| createdAt | Date | Date of schedule creation |
| createdBy | ObjectId | Reference to the Schedule publisher |

## Example

```json
{
  "_id": "schedule_id",
  "Description": "Regular Class",
  "class": "Database KKI",
  "teacher": "teacher_Ine",
  "startTime": "2026-05-11 09:00",
  "endTime": "2026-05-11 11:00",
  "room": "Room 204",
  "createdBy": "admin_UI"
}
```

---

# Message Model

The Message model stores communication between administrators, teachers, and students.

## Fields

| Field      | Type            | Description                                                      |
| ---------- | --------------- | ---------------------------------------------------------------- |
| sender     | ObjectId        | Reference to the user who sent the message (Teacher or Admin)    |
| recipients | Array<ObjectId> | List of users who receive the message (Teachers and/or students) |
| msg        | String          | Message content                                                  |
| createdAt  | Date            | Date the message was sent                                        |
| updatedAt  | Date            | Date of last update                                              |

## Example

```json
{
  "_id": "message_id",
  "sender": "admin_UI",
  "recipients": ["student_user_id", "teacher_user_id"],
  "msg": "The schedule has been updated."
}
```

---

# Notification Model

The Notification model stores important announcements and alerts sent to users.

## Fields

| Field      | Type            | Description                                   |
| ---------- | --------------- | --------------------------------------------- |
| sender     | ObjectId        | Reference to the admin or teacher who sent it |
| recipients | Array<ObjectId> | Users who receive the notification            |
| title      | String          | Notification title                            |
| content    | String          | Notification body                             |
| readBy     | Array<ObjectId> | Users who have already read the notification  |
| createdAt  | Date            | Date of notification creation                 |
| updatedAt  | Date            | Date of last update                           |

## Example

```json
{
  "_id": "notification_id",
  "sender": "admin_user_id",
  "recipients": ["student_user_id_1", "student_user_id_2"],
  "title": "Schedule Update",
  "content": "Your Monday schedule has been updated.",
  "readBy": []
}
```

---

# Redis Data Structures

Redis is used for temporary and real-time data. Unlike MongoDB, Redis does not store long-term documents in this project.

## Cached Schedule

Used to avoid repeating frequent MongoDB queries.

```json
{
  "key": "schedule:class_id",
  "value": [
    {
      "title": "Database Systems",
      "date": "2026-05-11",
      "startTime": "09:00",
      "endTime": "11:00"
    }
  ]
}
```

## Real-Time Notification Channel

Used with Redis Pub/Sub to publish notifications instantly.

```json
{
  "channel": "notifications",
  "message": {
    "title": "New announcement",
    "content": "A new message has been sent by the administration."
  }
}
```

---

# Relationships Summary

| Relationship         | Description                                     |
| -------------------- | ----------------------------------------------- |
| User → Message       | A user can send many messages                   |
| Message → User       | A message can have many recipients              |
| User → Class         | A teacher can manage many classes               |
| Class → User         | A class can contain many students               |
| Schedule → Class     | A schedule belongs to one class                 |
| Schedule → User      | A schedule is linked to one teacher             |
| User → Notification  | A user can receive many notifications           |
| Redis → Schedule     | Redis can cache schedule data for faster access |
| Redis → Notification | Redis can publish notifications in real time    |
