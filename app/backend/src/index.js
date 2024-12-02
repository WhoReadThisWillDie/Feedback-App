import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './routes/users.js';
import assignmentRouter from './routes/assignments.js';
import feedbackRouter from './routes/feedbacks.js';
import initializeDatabase from './db.js';

const app = express();
const port = 3000

app.use(bodyParser.json());
app.use("/users", userRouter);
app.use("/assignments", assignmentRouter);
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