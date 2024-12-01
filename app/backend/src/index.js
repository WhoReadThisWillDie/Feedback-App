import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './routes/users.js';
import assignmentRouter from './routes/assignments.js';
import feedbackRouter from './routes/feedbacks.js';

const app = express();
const port = 3000

app.use(bodyParser.json());
app.use("/users", userRouter);
app.use("/assignments", assignmentRouter);
app.use("/feedback", feedbackRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
