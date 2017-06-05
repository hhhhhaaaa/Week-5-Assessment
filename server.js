const express = require('express');
const bodyParser = require('body-parser');
const database = require('./database');
const ejs = require("ejs");
const fs = require("fs");
const path = require('path');
const app = express()

//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Static Files
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

//Routes
app.get('/', (request, response) => {
  database.getContacts((error, contacts) => {
    if (error) {
      response.status(500).render('error', {
        error: error,
      })
    } else {
      response.render('index', {
        contacts: contacts,
      })
    }
  })
})

app.use((request, response) => {
  response.status(404).render('not_found')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})
