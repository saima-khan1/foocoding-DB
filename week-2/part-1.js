import mysql from 'mysql';
import prompt from 'prompt';
import fs from 'fs';

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root1',
  password: 'Hamzaan06',
});
var preparedStatements = '';

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

  // Start the prompt
  prompt.start();

  // Call the function to display options
  displayOptions();
});

// Function to display the menu options
function displayOptions() {
  console.log('Please select an option:');
  console.log('1. What is the capital of a country?');
  console.log('2. List all the languages spoken in a region.');
  console.log('3. Find the number of cities where a language is spoken.');
  console.log('4. List all continents with the number of languages spoken.');
  console.log(
    '5. For the country given as input, are there any countries with the same official language in the same continent?'
  );
  console.log('6. Quit');

  // Prompt user for the option
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
      case 6:
        console.log('Quitting.');
        connection.end();
        break;
      default:
        console.log('Invalid option. Please try again.');
        displayOptions();
        break;
    }
  });
}

// Prepare the statement queries
const query1 =
  'SELECT city.Name FROM city INNER JOIN country ON city.ID = country.Capital where country.Name= ?';
const query2 =
  'select DISTINCT Language, region from country c join countrylanguage cl on c.code=cl.CountryCode where region = ?';
const query3 =
  'select count(ct.name) as cities ,cl.Language from countrylanguage cl join city ct using(countrycode) where Language= ? ';
const query4 =
  'select c.Continent , count(DISTINCT cl.Language) as numberoflanguage from country c join countrylanguage cl on c.code= cl.CountryCode GROUP BY c.Continent';
const query5 = `select c2.Name as CountryName, cl2.Language from country c1 join country c2 ON c1.Continent = c2.Continent join countrylanguage cl1 on c1.Code = cl1.CountryCode join countrylanguage cl2 on c2.Code = cl2.CountryCode where c1.Name = ? and c2.Name != ? and cl1.Language = cl2.Language`;

// Concatenate the prepared statements to the string variable
preparedStatements += query1 + '\n';
preparedStatements += query2 + '\n';
preparedStatements += query3 + '\n';
preparedStatements += query4 + '\n';
preparedStatements += query5 + '\n';

// Write the prepared statements to a file
fs.writeFile('prepared_statements.txt', preparedStatements, (error) => {
  if (error) {
    console.error('Error writing prepared statements to file:', error);
    return;
  }

  console.log('Prepared statements saved to file.');
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
    const query = query1;
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

      // Call the function to display options again
      displayOptions();
    });
  });
}

// Prompt for region name and list languages spoken
function promptForRegionLanguages() {
  console.log('Enter the name of the region:');
  prompt.get(['regionName'], (error, result) => {
    if (error) {
      console.error('Error while getting user input:', error);
      return;
    }

    const regionName = result.regionName;

    // Prepare the statement query
    const query = query2;
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

      // Call the function to display options again
      displayOptions();
    });
  });
}

// Prompt for language name and get the number of cities
function promptForLanguageCities() {
  console.log('Enter the name of the language:');
  prompt.get(['languageName'], (error, result) => {
    if (error) {
      console.error('Error while getting user input:', error);
      return;
    }

    const languageName = result.languageName;

    // Prepare the statement query
    const query = query3;
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

      // Call the function to display options again
      displayOptions();
    });
  });
}

// List continents with the number of languages spoken
function listContinentsWithLanguages() {
  // Prepare the statement query
  const query = query4;

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

    // Call the function to display options again
    displayOptions();
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
    const query = query5;
    const values = [countryName, countryName];

    // Execute the prepared statement
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error executing the query:', error);
        return;
      }

      if (results.length > 0) {
        console.log(
          `Countries with the same official language as ${countryName} in the same continent:`
        );
        results.forEach((row) =>
          console.log(`${row.CountryName}: ${row.Language}`)
        );
      } else {
        console.log(`No results found for ${countryName}.`);
      }

      // Call the function to display options again
      displayOptions();
    });
  });
}
