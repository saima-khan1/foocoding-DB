import mysql from 'mysql';

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root1',
  password: 'Hamzaan06',
});

con.connect(function (err) {
  if (err) throw err;
  console.log('Connected!');
});

// Create the HR database
con.query('CREATE DATABASE IF NOT EXISTS HR', (err) => {
  if (err) {
    console.error('Error creating the HR database:', err);
    return;
  }
  console.log('HR database created.');
});

// Use the HR database
con.query('USE HR', (err) => {
  if (err) {
    console.error('Error using the HR database:', err);
    return;
  }
  console.log('Using HR database.');
});

// Create the locations table
const createLocationsTableQuery = `
      CREATE TABLE IF NOT EXISTS locations (
        location_id INT AUTO_INCREMENT PRIMARY KEY,
        city VARCHAR(255),
        country VARCHAR(255)
      )
    `;
con.query(createLocationsTableQuery, (err) => {
  if (err) {
    console.error('Error creating the locations table:', err);
    return;
  }
  console.log('Locations table created.');
});

// Create the employee table
const createEmployeeTableQuery = `
     CREATE TABLE IF NOT EXISTS employee (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) not null,
       department VARCHAR(255) not null,
       location_id INT,
          FOREIGN KEY (location_id) REFERENCES locations(location_id)
     )
   `;
con.query(createEmployeeTableQuery, (err) => {
  if (err) {
    console.error('Error creating the employee table:', err);
    return;
  }
  console.log('Employee table created.');
});

// Insert rows into the locations table
const insertLocationsQuery = `
  INSERT INTO locations (city, country)
  VALUES
    ('New York', 'USA'),
    ('London', 'UK'),
    ('Helsingborg', 'SWEDEN'),
    ('Bangalore', 'INDIA'),
    ('Helsinki', 'FINLAND'),
    ('Karachi', 'Pakistan'),
    ('Oslo', 'Norway'),
    ('New York', 'USA'),
    ('washington DC', 'USA'),
    ('Paris', 'France')

`;
con.query(insertLocationsQuery, (err, results) => {
  if (err) {
    console.error('Error inserting rows into the locations table:', err);
    return;
  }
  console.log('Rows inserted into the locations table:', results.affectedRows);
});

// Insert rows into the employee table
const insertEmployeeQuery = `
        INSERT INTO employee (name, department, location_id)
        VALUES
          ('John Doe', 'HR', 1),
          ('Jane Smith', 'Finance', 2),
          ('maria D', 'marketing', 3),
          ('santa S', 'technical', 1),
          ('sharukh K', 'Testing', 4),
          ('Salman K', 'Operations', 5),
          ('Andrea C', 'Management', 6),
          ('Alia B', 'HR', 7),
          ('Deepika P', 'Finace', 8),
          ('Kiara M', 'Marketing', 7)
      `;
con.query(insertEmployeeQuery, (err, results) => {
  if (err) {
    console.error('Error inserting rows into the employee table:', err);
    return;
  }
  console.log('Rows inserted into the employee table:', results.affectedRows);
});

// Close the database connection
con.end((err) => {
  if (err) {
    console.error('Error closing the database connection:', err);
    return;
  }
});
