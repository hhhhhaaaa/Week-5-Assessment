const pg = require('pg')
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/contacts'
const client = new pg.Client(connectionString)
client.connect()

const query = function(sql, variables, callback){
  console.log('QUERY ->', sql.replace(/[\n\s]+/g, ' '), variables)

  client.query(sql, variables, function(error, result){
    if (error){
      console.log('QUERY <- !!ERROR!!')
      console.error(error)
      callback(error)
    }else{
      console.log('QUERY <-', JSON.stringify(result.rows))
      callback(error, result.rows)
    }
  })
}

const getContacts = function(callback){
  query(`
    SELECT
      *
    FROM
      contacts
    ORDER BY
      name
  `, [], callback)
}

const deleteContact = function(callback, id){
  query((`
    DELETE
    FROM
      contacts
    WHERE
      id
      =
  ` + id), [], callback)
}

const newContact = function(callback, info){
  query((`
    INSERT
    INTO
      contacts
      (name, email, phone, street, city, state, country, zip, birthday, website)
    VALUES
  ` + info), [], callback)
}

const searchContacts = function(callback, name){
  query((`
    SELECT
      *
    FROM
      contacts
    ORDER BY
      name
    WHERE
    name
    =
  ` + name), [], callback)
}

module.exports = {
  getContacts,
  deleteContact,
  newContact,
  searchContacts
}
