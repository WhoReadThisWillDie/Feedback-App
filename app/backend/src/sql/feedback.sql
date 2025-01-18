CREATE TABLE feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    file BLOB,
    file_type TEXT check(file_type in ('audio', 'video')),
    file_path TEXT,
    transcript TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);