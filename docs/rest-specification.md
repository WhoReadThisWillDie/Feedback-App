# REST  API Specification

## Feedback Endpoints

| **Method** | **Endpoint**                  | **Description**                     | **Request Body**                                   | **Response**                                                  | **Status Codes**                              |
|------------|-------------------------------|-------------------------------------|--------------------------------------------------|--------------------------------------------------------------|-----------------------------------------------|
| `GET`      | `/feedback`                  | Fetch all feedback.                 | N/A                                              | Array of feedback objects.                                    | `200 OK`, `500 Internal Server Error`         |
| `GET`      | `/feedback/{feedback_id}`    | Fetch specific feedback by ID.      | N/A                                              | Feedback object.                                              | `200 OK`, `404 Not Found`, `500 Internal Server Error` |
| `POST`     | `/feedback`                  | Add feedback for an assignment.     | `{ "feedback_giver": 1, "assignment_id": 1, "audio_file_path": "/path/to/audio.mp3", "transcription_text": "Feedback transcription" }` | Created feedback object.                                   | `201 Created`, `400 Bad Request`, `500 Internal Server Error` |
| `PUT`      | `/feedback/{feedback_id}`    | Update feedback details.            | `{ "audio_file_path": "/path/to/new/audio.mp3", "transcription_text": "Updated transcription" }` | Updated feedback object.                                    | `200 OK`, `400 Bad Request`, `404 Not Found`, `500 Internal Server Error` |
| `DELETE`   | `/feedback/{feedback_id}`    | Delete a feedback entry.            | N/A                                              | `{"message": "Feedback deleted successfully"}`               | `200 OK`, `404 Not Found`, `500 Internal Server Error` |
