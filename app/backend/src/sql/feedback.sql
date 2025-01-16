CREATE TABLE feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    media_type TEXT check(media_type in ('audio', 'video')),
    file BLOB,
    file_path TEXT,
    transcript TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);