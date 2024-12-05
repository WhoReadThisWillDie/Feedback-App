import initializeDatabase from "../db.js";

let db;

async function getDb(){
    if (!db){
        db = await initializeDatabase();
    }
    return db;
}

export async function getAllFeedback(){
    const db = await getDb();
    return await db.all("SELECT * FROM feedback");
}

export async function getFeedbackById(id){
    const db = await getDb();
    return await db.get("SELECT * FROM feedback WHERE id = ?", [id]);
}

export async function getFeedbackByUserId(userId) {
    const db = await getDb();
    return await db.all(
        "SELECT * FROM feedback WHERE user_id = ?",
        [userId]
    );
}

export async function getFeedbackByAssignmentId(assignmentId) {
    const db = await getDb();
    return await db.all(
        "SELECT * FROM feedback WHERE assignment_id = ?",
        [assignmentId]
    );
}

export async function createFeedback(userId, assignmentId, audioFilePath, transcript) {
    const db = await getDb();
    const result = await db.run(
        "INSERT INTO feedback (user_id, assignment_id, audio_file_path, transcript) VALUES (?,?,?,?)",
        [userId, assignmentId, audioFilePath, transcript]
    );
    return result.lastID;
}

export async function updateFeedback(id, audioFilePath, transcript) {
    const db = await getDb();
    const result = await db.run(
        "UPDATE FEEDBACK SET audio_file_path = ?, transcript = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        [audioFilePath, transcript, id]
    );
    return result.changes > 0;
}

export async function deleteFeedback(id) {
    const db = await getDb();
    const result = await db.run(
        "DELETE FROM feedback WHERE id = ?",
        [id]
    );
    return result.changes > 0;
}