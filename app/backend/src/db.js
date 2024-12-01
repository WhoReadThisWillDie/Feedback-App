import fs from "fs";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

const dbFile = "./database.sqlite";

async function initializeDatabase() {
  // Check if the database file exists
  const dbExists = fs.existsSync(dbFile);

  // Open the database
  const db = await open({
    filename: dbFile,
    driver: sqlite3.Database,
  });

  if (!dbExists) {
    console.log("Database doesn't exist. Creating database...");

    // Create users table
    await db.exec(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        role TEXT NOT NULL
      );
    `);

    // Create assignments table
    await db.exec(`
      CREATE TABLE assignments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create feedback table
    await db.exec(`
      CREATE TABLE feedback (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        assignment_id INTEGER NOT NULL,
        audio_file_path TEXT NOT NULL,
        transcript TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (assignment_id) REFERENCES assignments(id)
      );
    `);

    console.log("Database created successfully.");
  } else {
    console.log("Database already exists.");
  }

  return db;
}

export default initializeDatabase;
