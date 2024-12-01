import express from "express";

import initializeDatabase from "./db.js";

const app = express();
const port = 3000;

initializeDatabase()
  .then((db) => {
    console.log("Database initialized.");

    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize the database:", err);
    process.exit(1);
  });
