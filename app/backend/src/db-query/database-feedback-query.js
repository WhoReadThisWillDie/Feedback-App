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
    return await db.all("SELECT * FROM feedback");
}

export async function insertFeedback(audioFile, audioFilePath, transcript) {
    const db = await getDb();
    const result = await db.run(
        "INSERT INTO feedback (file, file_path, transcript) VALUES (?, ?, ?)",
        [audioFile || null, audioFilePath || null, transcript || null],
    );
    return result.lastID;
}