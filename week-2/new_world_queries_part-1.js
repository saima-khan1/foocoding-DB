import mysql from 'mysql';
import prompt from 'prompt';

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root1',
  password: 'Hamzaan06',
});

// Connect to the database
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error);
    return;
  }

  console.log('Connected to the database.');
  // Use the new_world database
  connection.query('USE new_world', (err) => {
    if (err) {
      console.error('Error using the new_world database:', err);
      return;
    }
  });

  // Configure prompt settings
  prompt.start();

  // Display the menu
  console.log('Please select an option:');
  console.log('1. What is the capital of a country?');
  console.log('2. List all the languages spoken in a region.');
  console.log('3. Find the number of cities where a language is spoken.');
  console.log('4. List all continents with the number of languages spoken.');
  console.log(
    '5. For the country given as input, are there any countries with the same official language in the same continent?'
  );

  // Prompt user for the query option
  prompt.get(['option'], (error, result) => {
    if (error) {
      console.error('Error while getting user input:', error);
      return;
    }

    const option = parseInt(result.option);

    switch (option) {
      case 1:
        promptForCountryCapital();
        break;
      case 2:
        promptForRegionLanguages();
        break;
      case 3:
        promptForLanguageCities();
        break;
      case 4:
        listContinentsWithLanguages();
        break;
      case 5:
        listCountriesWithSameLanguageAndContinent();
        break;
      default:
        console.log('Invalid option. Exiting.');
        connection.end();
        break;
    }
  });
});

// Prompt for country name and get capital

function promptForCountryCapital() {
  console.log('Enter the name of the country:');
  prompt.get(['countryName'], (error, result) => {
    if (error) {
      console.error('Error while getting user input:', error);
      return;
    }

    const countryName = result.countryName;

    // Prepare the statement query
    const query =
      'SELECT city.Name FROM city INNER JOIN country ON city.ID = country.Capital where country.Name= ?';
    const values = [countryName];

    // Execute the prepared statement
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error executing the query:', error);
        return;
      }

      if (results.length > 0) {
        const capital = results[0].Name;
        console.log(`The capital of ${countryName} is ${capital}.`);
      } else {
        console.log(`No results found for ${countryName}.`);
      }

      // Close the database connection
      connection.end();
    });
  });
}

// Prompt for region name and list languages spoken
function promptForRegionLanguages() {
  prompt.get(['regionName'], (error, result) => {
    if (error) {
      console.error('Error while getting user input:', error);
      return;
    }

    const regionName = result.regionName;

    // Prepare the statement query
    const query =
      'select DISTINCT Language, region from country c join countrylanguage cl on c.code=cl.CountryCode where region = ?';
    const values = [regionName];

    // Execute the prepared statement
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error executing the query:', error);
        return;
      }

      if (results.length > 0) {
        const languages = results.map((obj) => obj.Language);
        console.log(`Languages spoken in ${regionName}: ${languages}`);
      } else {
        console.log(`No results found for ${regionName}.`);
      }

      // Close the database connection
      connection.end();
    });
  });
}

// Prompt for language name and get the number of cities
function promptForLanguageCities() {
  prompt.get(['languageName'], (error, result) => {
    if (error) {
      console.error('Error while getting user input:', error);
      return;
    }

    const languageName = result.languageName;

    // Prepare the statement query
    const query =
      'select count(ct.name) as cities ,cl.Language from countrylanguage cl join city ct using(countrycode) where Language= ? ';
    const values = [languageName];

    // Execute the prepared statement
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error executing the query:', error);
        return;
      }

      if (results.length > 0) {
        const cityCount = results[0].cities;
        console.log(
          `Number of cities where ${languageName} is spoken: ${cityCount}`
        );
      } else {
        console.log(`No results found for ${languageName}.`);
      }

      // Close the database connection
      connection.end();
    });
  });
}

// List continents with the number of languages spoken
function listContinentsWithLanguages() {
  // Prepare the statement query
  const query =
    'select c.Continent , count(DISTINCT cl.Language) as numberoflanguage from country c join countrylanguage cl on c.code= cl.CountryCode GROUP BY c.Continent';

  // Execute the prepared statement
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing the query:', error);
      return;
    }

    if (results.length > 0) {
      console.log('Continents with the number of languages spoken:');
      results.forEach((row) =>
        console.log(`${row.Continent}: ${row.numberoflanguage}`)
      );
    } else {
      console.log('No results found.');
    }

    // Close the database connection
    connection.end();
  });
}

function listCountriesWithSameLanguageAndContinent() {
  console.log('Enter the name of the country:');
  prompt.get(['countryName'], (error, result) => {
    if (error) {
      console.error('Error while getting user input:', error);
      return;
    }

    const countryName = result.countryName;

    // Prepare the statement query
    const query = `select c2.Name as CountryName, cl2.Language from country c1 join country c2 ON c1.Continent = c2.Continent join countrylanguage cl1 on c1.Code = cl1.CountryCode join countrylanguage cl2 on c2.code = cl2.CountryCode where c1.Name = ? AND cl1.IsOfficial='T' and cl1.Language= cl2.Language AND c1.Code <> c2.code`;
    const values = [countryName];

    // Execute the prepared statement
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error executing the query:', error);
        return;
      }

      if (results.length > 0) {
        console.log(
          'Countries with the same official language in the same continent:'
        );
        results.forEach((row) => {
          console.log(row.CountryName);
        });
      } else {
        console.log('FALSE');
      }
      // Close the database connection
      connection.end();
    });
  });
}
