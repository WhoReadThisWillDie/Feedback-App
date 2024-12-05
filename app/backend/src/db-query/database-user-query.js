import initializeDatabase from "../db.js";

let db;

async function getDb() {
    if (!db){
        db = await initializeDatabase();
    }
    return db;
}

export async function getAllUsers() {
    const db = await getDb();
    return await db.all("SELECT * FROM users");
}

export async function getUserById(id){
    const db = await getDb();
    return await db.all("SELECT * FROM users WHERE id = ?", [id]);
}

export async function createUser(name, email, role){
    const db = await getDb();
    const result = await db.run(
        "INSERT INTO users (name, email, role) VALUES (?,?,?)",
        [name, email, role],
    );
    return result.lastID;
}

export async function updateUser(id, name, email, role){
    const db = await getDb();
    const result = await db.run(
        "UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?",
        [name, email, role, id]
    );
    return result.changes > 0;
}

export async function deleteUser(id){
    const db = await getDb();
    const result = await db.run(
        "DELETE FROM users WHERE id = ?",
        [id]
    );
    return result.changes > 0;
}