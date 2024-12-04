import initializeDatabase from "../db.js"

let db;

async function getDatabase(){
    if (!db){
        db = await initializeDatabase();
    }
    return db;
}

export async function getAllUsers(){

}