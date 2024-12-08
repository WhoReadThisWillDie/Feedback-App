import initializeDatabase from "../db.js";

let db;

// Ensure the database is initialized before running queries
async function getDb() {
    if (!db) {
        db = await initializeDatabase();
    }
    return db;
}

// Select all feedback entries
export async function getAllFeedback() {
    const db = await getDb();
    return await db.all("SELECT * FROM feedback");
}

// Select feedback by ID
export async function getFeedbackById(id) {
    const db = await getDb();
    return await db.get("SELECT * FROM feedback WHERE id = ?", [id]);
}

// Insert new feedback
export async function createFeedback(audioFilePath, transcript) {
    const db = await getDb();
    const result = await db.run(
        "INSERT INTO feedback (audio_file_path, transcript) VALUES (?, ?)",
        [audioFilePath, transcript]
    );
    return result.lastID;
}

// Update feedback by ID
export async function updateFeedback(id, audioFilePath, transcript) {
    const db = await getDb();
    const result = await db.run(
        "UPDATE feedback SET audio_file_path = ?, transcript = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        [audioFilePath, transcript, id]
    );
    return result.changes > 0;
}

// Delete feedback by ID
export async function deleteFeedback(id) {
    const db = await getDb();
    const result = await db.run("DELETE FROM feedback WHERE id = ?", [id]);
    return result.changes > 0;
}
