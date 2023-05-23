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

// Use the new_world database
con.query('USE new_world', (err) => {
  if (err) {
    console.error('Error using the new_world database:', err);
    return;
  }
  console.log('Using new_world database.');
});

// 1. What are the names of countries with population greater than 8 million
con.query(
  'SELECT name, population FROM country WHERE population > 8000000',
  (err, results) => {
    if (err) {
      console.error('Error executing the query:', err);
      return;
    }
    console.log('Countries with population greater than 8 million:', results);
  }
);
// 2. What are the names of countries that have “land” in their names?
con.query(
  "SELECT name FROM country WHERE name LIKE '%land%'",
  (err, results) => {
    if (err) {
      console.error('Error executing the query:', err);
      return;
    }
    console.log('Countries with "land" in their names:', results);
  }
);

// 3. What are the names of the cities with population in between 500,000 and 1 million?
con.query(
  'SELECT name, population FROM country WHERE population BETWEEN 500000 AND 1000000',
  (err, results) => {
    if (err) {
      console.error('Error executing the query:', err);
      return;
    }
    console.log(
      'Cities with population between 500,000 and 1 million:',
      results
    );
  }
);

// 4.  What's the name of all the countries on the continent ‘Europe’ ?
con.query(
  `select name, continent from country where continent = 'Europe'`,
  (err, results) => {
    if (err) {
      console.error('Error executing the query:', err);
      return;
    }
    console.log('name of all the countries on the continent Europe', results);
  }
);

// 5.  List all the countries in the descending order of their surface areas. ?
con.query(
  'select name, surfacearea from country order by surfacearea desc',
  (err, results) => {
    if (err) {
      console.error('Error executing the query:', err);
      return;
    }
    console.log(
      'List of the countries in the descending order of their surface areas',
      results
    );
  }
);

//6.What are the names of all the cities in the Netherlands?
con.query(
  `SELECT city.name AS cityName, country.name AS countryName
  FROM city
  INNER JOIN country ON city.countrycode = country.code
  WHERE country.name = 'Netherlands'`,
  (err, results) => {
    if (err) {
      console.error('Error executing the query:', err);
      return;
    }
    console.log('names of all the cities in the Netherlands', results);
  }
);

//7.What is the population of Rotterdam ?

con.query(
  `select name, population from city where name = 'Rotterdam'
  `,
  (err, results) => {
    if (err) {
      console.error('Error executing the query:', err);
      return;
    }
    console.log('the population of Rotterdam ', results);
  }
);

//8. What's the top 10 countries by Surface Area ?

con.query(
  'select name, surfacearea from country order by surfacearea desc limit 10',
  (err, results) => {
    if (err) {
      console.error('Error executing the query:', err);
      return;
    }
    console.log('the top 10 countries by Surface Area', results);
  }
);

//9.What's the top 10 most populated cities?

con.query(
  'select name, population from city order by population desc limit 10',
  (err, results) => {
    if (err) {
      console.error('Error executing the query:', err);
      return;
    }
    console.log('the top 10 most populated cities', results);
  }
);

//10. What is the population of the world ?
con.query(
  'select sum(population) as worldpopulation from country',
  (err, results) => {
    if (err) {
      console.error('Error executing the query:', err);
      return;
    }
    console.log('population of the world', results);
  }
);

// Close the database connection
con.end((err) => {
  if (err) {
    console.error('Error closing the database connection:', err);
    return;
  }
});
