const express = require('express');
const helpers = require('express-helpers');
const bodyParser = require('body-parser');
const database = require('./database');
const ejs = require("ejs");
const fs = require("fs");
const path = require('path');

const app = express()
helpers(app);

//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Static Files
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: false
}))

// get retriving information
// put/patch editing
// post creation
// delete deltion

//Routes
app.get('/', (request, response) => {
  database.getContacts((error, contacts) => {
    if (error) {
      response.status(500).render('error', {
        error: error,
      })
    } else {
      response.render('index', {
        contacts: contacts
      })
    }
  })
})


app.get('/contacts/new', (request, response) => {
  database.getContacts((error, contacts) => {
    if (error) {
      response.status(500).render('error', {
        error: error,
      })
    } else {
      response.render('new', {
        contacts: contacts,
      })
    }
  })
})

app.get('/contacts/:id', (request, response) => {
  database.getContacts((error, contacts) => {
    var contactName = null;
    for (var i = 0; i < contacts.length; i++) {
      contactName = contacts[i]
      if (contactName.id == request.params.id) {
        break;
      }
    }
    if (error) {
      response.status(500).render('error', {
        error: error,
      })
    } else {
      response.render('contact', {
        contacts: contacts,
        contactName: contactName
      })
    }
  })
})

app.get('/search', (request, response) => {
  database.getContacts((error, contacts) => {
    if (error) {
      response.status(500).render('error', {
        error: error,
      })
    } else {
      response.render('search', {
        contacts: contacts,
      })
    }
  })
})

//Port
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})
