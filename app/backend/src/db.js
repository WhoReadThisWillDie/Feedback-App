import fs from "fs";
import path from "path";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";

const dbFile = "./database.sqlite";

// Helper variables for SQL directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

    async function executeSQLFromFile(filePath) {
      const sql = fs.readFileSync(filePath, "utf-8");
      await db.exec(sql);
    }

    //Path to SQL directory
    const sqlDirectory = path.join(__dirname, "sql");

    await executeSQLFromFile(path.join(sqlDirectory, "feedback.sql"));

    console.log("Database created successfully.");
  } else {
    console.log("Database already exists.");
  }

  return db;
}

export default initializeDatabase;
