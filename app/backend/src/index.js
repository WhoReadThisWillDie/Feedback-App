import express from 'express';
import bodyParser from 'body-parser';
import feedbackRouter from './routes/feedbacks.js';
import initializeDatabase from './db.js';

const app = express();
const port = 3000

app.use(bodyParser.json());
app.use("/feedback", feedbackRouter);

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