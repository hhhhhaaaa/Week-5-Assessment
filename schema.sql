CREATE TABLE contacts (
  id SERIAL,
  name VARCHAR(255) NOT NULL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  phone INT NOT NULL,
  street VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  state VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  zip INT NOT NULL,
  birthday DATE NOT NULL,
  website VARCHAR(255) NOT NULL
);
