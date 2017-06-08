var deleteContact = function(id) {
  database.query("DELETE FROM contacts WHERE id =" + contacts.id);
};
