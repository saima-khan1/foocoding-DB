INSERT INTO ToDoList (list_id, list_name, user_id) VALUES (?, ?, ?);
DELETE FROM ToDoList WHERE list_id = ?;
INSERT INTO ToDoItem (item_id, item_name, list_id, is_completed, reminder_date) VALUES (?, ?, ?, ?, ?);
DELETE FROM ToDoItem WHERE item_id = ?;
UPDATE ToDoItem SET is_completed = true WHERE item_id = ?;
UPDATE ToDoItem SET reminder_date = ? WHERE list_id = ?;
UPDATE ToDoList SET reminder_date = ? WHERE list_id = ?;
UPDATE ToDoList SET reminder_date = ? WHERE list_id = ?;