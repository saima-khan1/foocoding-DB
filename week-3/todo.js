// import mysql from 'mysql';
// import  Express  from 'express';

// var con = mysql.createConnection({
//   host: 'localhost',
//   user: 'root1',
//   password: 'Hamzaan06',
// });

// con.connect(function (err) {
//   if (err) throw err;
//   console.log('Connected!');
// });

import mysql from 'mysql';
import express from 'express';
const app = express();

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name',
});

// Example API endpoint using prepared statements
app.get('/api/todo/:id', (req, res) => {
  const todoId = req.params.id;
  const sql = 'SELECT * FROM todos WHERE id = ?';
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error connecting to the database');
      return;
    }
    connection.prepare(sql, (err, statement) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error preparing the SQL statement');
        return;
      }
      statement.execute([todoId], (err, results) => {
        statement.close();
        connection.release();
        if (err) {
          console.error(err);
          res.status(500).send('Error retrieving todo');
        } else {
          if (results.length === 0) {
            res.status(404).send('Todo not found');
          } else {
            res.json(results[0]);
          }
        }
      });
    });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
