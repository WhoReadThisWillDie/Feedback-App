import initializeDatabase from "../db.js";

let db;

// Ensure the database is initialized before running queries
async function getDb() {
    if (!db) {
        db = await initializeDatabase();
    }
    return db;
}

// Select all feedback_audio entries
export async function getAllFeedbacks() {
    const db = await getDb();
    return await db.all("SELECT * FROM feedback_audio");
}

export async function insertFeedback(audioFile, audioFilePath, transcript) {
    const db = await getDb();
    const result = await db.run(
        "INSERT INTO feedback_audio (audio_file, audio_file_path, transcript) VALUES (?, ?, ?)",
        [audioFile || null, audioFilePath || null, transcript || null],
    );
    return result.lastID;
}