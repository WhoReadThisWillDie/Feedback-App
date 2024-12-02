# REST  API Specification

## Users Endpoints

| **Method** | **Endpoint**             | **Description**                | **Request Body**                                   | **Response**                                                  | **Status Codes**                              |
|------------|--------------------------|--------------------------------|--------------------------------------------------|--------------------------------------------------------------|-----------------------------------------------|
| `GET`      | `/users`                | Fetch all users.               | N/A                                              | Array of user objects.                                        | `200 OK`, `500 Internal Server Error`         |
| `GET`      | `/users/{user_id}`      | Fetch a specific user by ID.   | N/A                                              | User object.                                                  | `200 OK`, `404 Not Found`, `500 Internal Server Error` |
| `GET`      | `/users/{user_id}/feedback`  | Fetch all feedback given by a user. | N/A                                              | Array of feedback objects by the user.                       | `200 OK`, `404 Not Found`, `500 Internal Server Error` |
| `POST`     | `/users`                | Add a new user.                | `{ "name": "John", "email": "john@xyz.com", "role": "Instructor" }` | Created user object.                                          | `201 Created`, `400 Bad Request`, `500 Internal Server Error` |
| `PUT`      | `/users/{user_id}`      | Update an existing user.       | `{ "name": "John", "email": "john@xyz.com", "role": "Admin" }` | Updated user object.                                          | `200 OK`, `400 Bad Request`, `404 Not Found`, `500 Internal Server Error` |
| `DELETE`   | `/users/{user_id}`      | Delete a user.                 | N/A                                              | `{"message": "User deleted successfully"}`                   | `200 OK`, `404 Not Found`, `500 Internal Server Error` |

## Assignment Endpoints

| **Method** | **Endpoint**                   | **Description**                | **Request Body**                                   | **Response**                                                  | **Status Codes**                              |
|------------|--------------------------------|--------------------------------|--------------------------------------------------|--------------------------------------------------------------|-----------------------------------------------|
| `GET`      | `/assignments`                | Fetch all assignments.         | N/A                                              | Array of assignment objects.                                  | `200 OK`, `500 Internal Server Error`         |
| `GET`      | `/assignments/{assignment_id}`| Fetch a specific assignment by ID. | N/A                                              | Assignment object.                                           | `200 OK`, `404 Not Found`, `500 Internal Server Error` |
| `GET`      | `/assignments/{assignment_id}/feedback` | Fetch all feedback for a specific assignment. | N/A                                              | Array of feedback objects for the assignment.                | `200 OK`, `404 Not Found`, `500 Internal Server Error` |
| `POST`     | `/assignments`                | Add a new assignment.          | `{ "title": "Assignment 1", "description": "Details", "date_created": "2024-12-01T10:00:00Z", "date_updated": "2024-12-01T10:00:00Z" }` | Created assignment object.                                   | `201 Created`, `400 Bad Request`, `500 Internal Server Error` |
| `PUT`      | `/assignments/{assignment_id}`| Update an assignment.          | `{ "title": "Updated Assignment", "description": "Updated details" }` | Updated assignment object.                                   | `200 OK`, `400 Bad Request`, `404 Not Found`, `500 Internal Server Error` |
| `DELETE`   | `/assignments/{assignment_id}`| Delete an assignment.          | N/A                                              | `{"message": "Assignment deleted successfully"}`             | `200 OK`, `404 Not Found`, `500 Internal Server Error` |

## Feedback Endpoints

| **Method** | **Endpoint**                  | **Description**                     | **Request Body**                                   | **Response**                                                  | **Status Codes**                              |
|------------|-------------------------------|-------------------------------------|--------------------------------------------------|--------------------------------------------------------------|-----------------------------------------------|
| `GET`      | `/feedback`                  | Fetch all feedback.                 | N/A                                              | Array of feedback objects.                                    | `200 OK`, `500 Internal Server Error`         |
| `GET`      | `/feedback/{feedback_id}`    | Fetch specific feedback by ID.      | N/A                                              | Feedback object.                                              | `200 OK`, `404 Not Found`, `500 Internal Server Error` |
| `POST`     | `/feedback`                  | Add feedback for an assignment.     | `{ "feedback_giver": 1, "assignment_id": 1, "audio_file_path": "/path/to/audio.mp3", "transcription_text": "Feedback transcription" }` | Created feedback object.                                   | `201 Created`, `400 Bad Request`, `500 Internal Server Error` |
| `PUT`      | `/feedback/{feedback_id}`    | Update feedback details.            | `{ "audio_file_path": "/path/to/new/audio.mp3", "transcription_text": "Updated transcription" }` | Updated feedback object.                                    | `200 OK`, `400 Bad Request`, `404 Not Found`, `500 Internal Server Error` |
| `DELETE`   | `/feedback/{feedback_id}`    | Delete a feedback entry.            | N/A                                              | `{"message": "Feedback deleted successfully"}`               | `200 OK`, `404 Not Found`, `500 Internal Server Error` |
