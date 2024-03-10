const express = require('express')
const app = express()
const port = 8000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const notesRouter = require("./routes/notes");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)

app.use('/notes', notesRouter);
})
