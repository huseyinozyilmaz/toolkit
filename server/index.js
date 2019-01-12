const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const database = require('./config/dbconfig')
const port = process.env.PORT || 8081
const app = express()

database.init()
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', require('./routes'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/public/')))
  app.get(/.*/, (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')))
}

app.listen(port, function () {
  console.log(`Server listening on port ${port}`)
})
