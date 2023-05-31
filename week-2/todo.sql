use todo_app;
CREATE TABLE User (
  user_id INT PRIMARY KEY,
  username VARCHAR(255),
  password VARCHAR(255),
  email VARCHAR(255)
);

CREATE TABLE ToDoList (
  list_id INT PRIMARY KEY,
  list_name VARCHAR(255),
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
CREATE TABLE ToDoItem (
  item_id INT PRIMARY KEY,
  item_name VARCHAR(255),
  list_id INT,
  is_completed BOOLEAN,
  reminder_date DATE,
  FOREIGN KEY (list_id) REFERENCES ToDoList(list_id)
);
CREATE TABLE Tag (
  tag_id INT PRIMARY KEY,
  tag_name VARCHAR(255)
);
CREATE TABLE ItemTag (
  item_id INT,
  tag_id INT,
  FOREIGN KEY (item_id) REFERENCES ToDoItem(item_id),
  FOREIGN KEY (tag_id) REFERENCES Tag(tag_id),
  PRIMARY KEY (item_id, tag_id)
);
