import initializeDatabase from "../db.js"

let db;

async function getDb(){
    if (!db){
        db = await initializeDatabase();
    }
    return db;
}

export async function getAllAssignments(){
    const db = await getDb();
    return await db.all("SELECT * FROM assignments");
}

export async function getAssignmentById(id){
    const db = await getDb();
    return await db.get("SELECT * FROM assignments WHERE id = ?", [id]);
}

export async function createAssignment(title, description){
    const db = await getDb();
    const result = await db.run(
        "INSERT INTO assignments (title, description) VALUES (?,?)",
        [title, description]
    );
    return result.lastID;
}

export async function updateAssignment(id, title, description){
    const db = await getDb();
    const result = await db.run(
        "UPDATE assignments SET title = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        [title, description, id]
    );
    return result.changes > 0;
}

export async function deleteAssignment(id){
    const db = await getDb();
    const result = await db.run(
        "DELETE FROM assignments WHERE id = ?",
        [id]
    );
    return result.changes > 0;
}