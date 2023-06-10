import express from 'express';
import mysql from 'mysql2/promise';
import fs from 'fs';

const app = express();
// Parse JSON request body
app.use(express.json());

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root1',
  password: 'Hamzaan06',
  database: 'todo_app',
});

// Load SQL queries from file
const queriesFilePath = 'queries.sql';

function loadQueries() {
  let queries = [];
  if (fs.existsSync(queriesFilePath)) {
    queries = fs.readFileSync(queriesFilePath, 'utf8').split(';');
    queries = queries
      .map((query) => query.trim())
      .filter((query) => query.length > 0);
  }
  return queries;
}

function saveQueries(queries) {
  const content = queries.join(';\n') + ';';
  fs.writeFileSync(queriesFilePath, content, 'utf8');
}

// API endpoint to insert a new ToDo list
app.post('/api/lists', async (req, res) => {
  const { list_id, list_name, user_id } = req.body;

  const sql =
    'INSERT INTO ToDoList (list_id, list_name, user_id) VALUES (?, ?, ?)';
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(sql, [list_id, list_name, user_id]);
    connection.release();
    res.send('List created successfully');
    const queries = loadQueries();
    queries.push(sql);
    saveQueries(queries);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating the list');
  }
});

// API endpoint to delete a ToDo list
app.delete('/api/lists/:id', async (req, res) => {
  const listId = req.params.id;

  const sql = 'DELETE FROM ToDoList WHERE list_id = ?';
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(sql, [listId]);
    connection.release();
    res.json({ message: 'List deleted successfully' });
    const queries = loadQueries();
    queries.push(sql);
    saveQueries(queries);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting the list');
  }
});

// API endpoint to create new Create a new ToDo list
app.post('/api/items', async (req, res) => {
  const { item_id, item_name, list_id, is_completed } = req.body;

  const sql =
    'INSERT INTO ToDoItem (item_id, item_name, list_id, is_completed) VALUES (?, ?, ?, ?)';
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(sql, [
      item_id,
      item_name,
      list_id,
      is_completed,
    ]);
    connection.release();
    res.send('Item(s) inserted successfully');
    const queries = loadQueries();
    queries.push(sql);
    saveQueries(queries);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error inserting item(s)');
  }
});

// API endpoint to delete item(s) in ToDo list
app.delete('/api/items/:id', async (req, res) => {
  const itemId = req.params.id;

  const sql = 'DELETE FROM ToDoItem WHERE item_id = ?';
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(sql, [itemId]);
    connection.release();
    res.send('Item(s) deleted successfully');
    const queries = loadQueries();
    queries.push(sql);
    saveQueries(queries);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting item(s)');
  }
});

// API endpoint to mark an item as completed
app.put('/api/items/:id', async (req, res) => {
  const itemId = req.params.id;

  const sql = 'UPDATE ToDoItem SET is_completed = true WHERE item_id = ?';
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(sql, [itemId]);
    connection.release();
    res.send('Item marked as completed successfully');
    const queries = loadQueries();
    queries.push(sql);
    saveQueries(queries);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error marking item as completed');
  }
});

// API endpoint to add a reminder for the list (not for the item)
app.put('/api/lists/:id', async (req, res) => {
  const listId = req.params.id;
  const { reminder_date } = req.body;

  const sql = 'UPDATE ToDoList SET reminder_date = ? WHERE list_id = ?';
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(sql, [reminder_date, listId]);
    connection.release();
    res.send('Reminder added for the list successfully');
    const queries = loadQueries();
    queries.push(sql);
    saveQueries(queries);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding reminder for the list');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
