import express from 'express';
import cors from 'cors';
import feedbackRouter from './routes/feedbacks.js';
import transcriptionRouter from './routes/transcriptions.js';
import staticFilesRouter from './routes/static-files.js';
import initializeDatabase from './db.js';

const app = express();
const port = 3000

app.use(cors())
app.use(express.json());

app.use((req, res, next) => {
    console.log(`Received request for ${req.method} ${req.url}`);
    next();
});

app.use("/feedbacks", feedbackRouter);
app.use("/transcriptions", transcriptionRouter);
app.use("/static", staticFilesRouter);

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