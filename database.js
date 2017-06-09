const pg = require('pg')
//Database Connection
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/contacts'
//Client Connection
const client = new pg.Client(connectionString)
client.connect()

const query = function(sql, variables, callback) {
  client.query(sql, variables, function(error, result) {
    if (error) {
      console.log('QUERY <- !!ERROR!!')
      console.error(error)
      callback(error)
    } else {
      callback(error, result.rows)
    }
  })
}

const getContacts = function(callback) {
  query(`
    SELECT
      *
    FROM
      contacts
    ORDER BY
      name
  `, [], callback)
}

const deleteContacts = function(id, callback) {
  query(`
    DELETE
    FROM
      contacts
    WHERE
      id = $1
  `, [id], callback)
}

module.exports = {
  getContacts,
  deleteContacts
}
