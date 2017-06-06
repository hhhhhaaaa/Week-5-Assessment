CREATE TABLE contacts (
  id SERIAL,
  name VARCHAR(100) NOT NULL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  street VARCHAR(35) NOT NULL,
  city VARCHAR(35) NOT NULL,
  state VARCHAR(35) NOT NULL,
  country VARCHAR(35) NOT NULL,
  zip INT NOT NULL,
  birthday DATE NOT NULL,
  website VARCHAR(255) NOT NULL
);
