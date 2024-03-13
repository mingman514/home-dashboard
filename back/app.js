const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const notesRouter = require("./routes/notes");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)

app.use('/notes', notesRouter);
})
