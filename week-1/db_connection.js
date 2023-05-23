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

// Create the employee table
const createEmployeeTableQuery = `
     CREATE TABLE IF NOT EXISTS employee (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) not null,
       department VARCHAR(255) not null
     )
   `;
con.query(createEmployeeTableQuery, (err) => {
  if (err) {
    console.error('Error creating the employee table:', err);
    return;
  }
  console.log('Employee table created.');
});

// Create the locations table
const createLocationsTableQuery = `
      CREATE TABLE IF NOT EXISTS locations (
        location_id INT AUTO_INCREMENT PRIMARY KEY,
        city VARCHAR(255),
        country VARCHAR(255),
        employee_id int not null,
        FOREIGN KEY (employee_id) REFERENCES employee(id)
      )
    `;
con.query(createLocationsTableQuery, (err) => {
  if (err) {
    console.error('Error creating the locations table:', err);
    return;
  }
  console.log('Locations table created.');
});

// Insert rows into the employee table
const insertEmployeeQuery = `
        INSERT INTO employee (name, department)
        VALUES
          ('John Doe', 'HR'),
          ('Jane Smith', 'Finance'),
          ('maria D', 'marketing'),
          ('santa S', 'technical'),
          ('sharukh K', 'Testing'),
          ('Salman K', 'Operations'),
          ('Andrea C', 'Management'),
          ('Alia B', 'HR'),
          ('Deepika P', 'Finace'),
          ('Kiara M', 'Marketing')
      `;
con.query(insertEmployeeQuery, (err, results) => {
  if (err) {
    console.error('Error inserting rows into the employee table:', err);
    return;
  }
  console.log('Rows inserted into the employee table:', results.affectedRows);
});

// Insert rows into the locations table
const insertLocationsQuery = `
  INSERT INTO locations (city, country, employee_id)
  VALUES
    ('New York', 'USA', 1001),
    ('London', 'UK', 1002),
    ('Helsingborg', 'SWEDEN', 1003),
    ('Bangalore', 'INDIA', 1004),
    ('Helsinki', 'FINLAND', 1005),
    ('Karachi', 'Pakistan', 1006),
    ('Oslo', 'Norway', 1007),
    ('New York', 'USA', 1008),
    ('washington DC', 'USA', 1009),
    ('Paris', 'France', 1010)

`;
con.query(insertLocationsQuery, (err, results) => {
  if (err) {
    console.error('Error inserting rows into the locations table:', err);
    return;
  }
  console.log('Rows inserted into the locations table:', results.affectedRows);
});

// Close the database connection
con.end((err) => {
  if (err) {
    console.error('Error closing the database connection:', err);
    return;
  }
});
