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
export async function getAllFeedback() {
    const db = await getDb();
    return await db.all("SELECT * FROM feedback_audio");
}

// Select feedback_audio by ID
export async function getFeedbackById(id) {
    const db = await getDb();
    return await db.get("SELECT * FROM feedback_audio WHERE id = ?", [id]);
}

export async function getAudioById(id) {
    const db = await getDb();
    return await db.get("SELECT audio_file_path FROM feedback_audio WHERE id = ?", [id]);
}

export async function insertFeedback(audioFile, audioFilePath, transcript) {
    const db = await getDb();
    console.log(audioFilePath);
    console.log(transcript);
    const result = await db.run(
        "INSERT INTO feedback_audio (audio_file, audio_file_path, transcript) VALUES (?, ?, ?)",
        [audioFile || null, audioFilePath || null, transcript || null],
    );
    return result.lastID;
}

// Update feedback_audio by ID
export async function updateFeedback(id, audioFilePath, transcript) {
    const db = await getDb();
    const result = await db.run(
        "UPDATE feedback_audio SET audio_file_path = ?, transcript = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        [audioFilePath, transcript, id]
    );
    return result.changes > 0;
}

// Delete feedback_audio by ID
export async function deleteFeedback(id) {
    const db = await getDb();
    const result = await db.run("DELETE FROM feedback_audio WHERE id = ?", [id]);
    return result.changes > 0;
}
