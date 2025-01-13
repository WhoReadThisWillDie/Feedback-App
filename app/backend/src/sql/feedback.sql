CREATE TABLE feedback_audio (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    audio_file_path TEXT,
    audio_file BLOB,
    transcript TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE feedback_video (
    id INTEGER PRIMARY KEY AUTOINCREMENT ,
    video_file_path TEXT,
    video_file BLOB,
    transcript TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)