const express = require("express");
const app = express()
const cors = require("cors")
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

const db  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'Yoshi3.ie',
  database        : 'Run Tracker'
});

const saltRounds = 10;

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

app.post('/signup', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  if (username.length < 1) {
    res.status(404).send('Please enter a username.')
  } else if (password.length < 1) {
    res.status(404).send('Please enter a password')
  } else {
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        res.status(404).send('Couldnt hash password.')
      } else {
        db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], (err, result) => {
          if (err) {
            console.log(err, result, username, hashedPassword)
            res.status(404).send('Couldnt register user, username may already exist')
          } else {
            res.send({username})
          }
        })
      }
    })
  }
})

app.post('/signin', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  db.query("SELECT * FROM users WHERE username = ?", [username], (err, result) => {
    if (err) {
      res.status(404).send(err.message)
    } else if (result.length < 1) {
      res.status(404).send("Username doesn't match")
    } else {
      bcrypt.compare(password, result[0].password, (err, match) => {
        if (match) {
          res.send(result)
        }
        if (!match) {
          res.status(404).send("Password doesnt match")
        }
      })
    }
  })
})

app.post('/:id/add-friend', (req, res) => {
  const user = req.params.id
  const friend = req.body.username
  console.log({user})
  console.log({friend})
  db.query("INSERT INTO friends (user, friend) VALUES ((SELECT user_id FROM users WHERE username = ?), (SELECT user_id FROM users WHERE username = ?))", 
  [user, friend], (err, result) => {
    if (err) {
      console.log(err)
      res.status(404).send('An error occured.')
    } 
    if (result) {
      res.send({added: true})
    }
  })
})

app.post('/send-runs', (req, res) => {
  const username = req.body.username;
  const runs = JSON.stringify(req.body.runs); // Ensure runs are converted to a JSON string

  console.log("Received runs for user:", username, req.body.runs); // Add this log
  console.log("Runs to be stored:", runs); // Add this log

  db.query('UPDATE users SET runs = ? WHERE username = ?', [runs, username], (err, result) => {
    if (err) {
      console.log("Error updating runs:", err);
      return res.status(404).send("An error occurred posting runs.");
    }
    if (result) {
      console.log("Runs updated successfully:", result);
      return res.send(result);
    }
  })});

app.get('/get-runs', (req, res) => {
  const username = req.params.user
  db.query("SELECT * FROM users WHERE username = ?", [username], (err, result) => {
    if (err) {
      res.status(404).send('An error occured getting runs')
    } 
    if (result) {
      res.send(result.runs)
    }
  })
})

app.get('/find-friends', (req, res) => {
  const username = req.query.user
  db.query("SELECT u.username FROM users u WHERE user_id NOT IN (SELECT f.friend FROM friends f WHERE user = (SELECT u.user_id FROM users u WHERE username = ?)) AND username != ?", [username, username], (err, result) => {
    if (err) {
      res.status(404).send('An error occured.')
    }
    if (result) {
      res.send(result)
    }
  })
})

app.get('/your-friends', (req, res) => {
  const username = req.query.user
  db.query("SELECT u.username FROM users u WHERE user_id IN (SELECT f.friend FROM friends f WHERE user = (SELECT u.user_id FROM users u WHERE username = ?)) AND username != ?", [username, username], (err, result) => {
    if (err) {
      res.status(404).send('An error occured.')
    }
    if (result) {
      res.send(result)
    }
  })
})

app.listen(8080, () => {
  console.log("server listening on port 8080")
})