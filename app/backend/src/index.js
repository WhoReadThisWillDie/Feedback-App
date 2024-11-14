import express from 'express';
const app = express()
const port = 3000

app.use("/example", exampleRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})