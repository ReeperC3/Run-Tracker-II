const express = require("express");
const app = express()
const cors = require("cors")
const mysql = require('mysql2')
const bodyParser = require('body-parser')

const db  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'Yoshi3.ie',
  database        : 'Run Tracker'
});

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

app.post('/signup', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, password], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send({username: username})
    }
  })
})

app.listen(8080, () => {
  console.log("server listening on port 8080")
})