# Node.js MySQL ToDo App

This is a simple Node.js application that demonstrates how to use MySQL with prepared statements to create a ToDo app. It provides an API for managing ToDo lists and items.

## Installation

1. Clone the repository:
   git clone <https://github.com/saima-khan1/foocoding-DB.git>

2. Navigate to directory: foocoding-DB/week-3 find the supporting project files.

3. Install the dependencies:
   npm install

4. Set up the MySQL database:
   - Create a new database in your MySQL server.
   - Update the database configuration in the app.js file by modifying the createPool options to match your database configuration.
   - Import the database schema from a SQL dump file "todo_app_dump.sql". You can use the following command to import the schema:
     mysql -u <username> -p <database_name> < todo_app_dump.sql

## Usage

1. Start the server:

   - use "node app.js" command the server will start running on http://localhost:3000.

2. API endpoints using HTTP methods (POST, DELETE, PUT) on the following routes:

   - Create a new ToDo list

     - URL: POST /api/lists
     - Request Body:
       {
       "list_id": "<list_id>",
       "list_name": "<list_name>",
       "user_id": "<user_id>"
       }

   - Delete a ToDo list

     - URL: DELETE /api/lists/:id
     - Parameters:
       id: The ID of the list to be deleted.

   - Create a new ToDo item

     - URL: POST /api/items
     - Request Body:
       {
       "item_id": "<item_id>",
       "item_name": "<item_name>",
       "list_id": "<list_id>",
       "is_completed": "<is_completed>",
       "reminder_date": "<reminder_date>"
       }

   - Delete a ToDo item

     - URL: DELETE /api/items/:id
     - Parameters:
       id: The ID of the item to be deleted.

   - Mark an item as completed

     - URL: PUT /api/items/:id
     - Parameters:
       id: The ID of the item to be marked as completed.

   - Add a reminder for the list
     - URL: PUT /api/lists/:id
     - Parameters:
       id: The ID of the list.
     - Request Body:
       {
       "reminder_date": "<reminder_date>"
       }

## Acknowledgment

This project is educational project for FooCoding course in Malmo.
