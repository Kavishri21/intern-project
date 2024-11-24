# from flask import Flask, request, jsonify
# import sqlite3

# app = Flask(__name__)

# def init_db():
#     conn = sqlite3.connect('todos.db')
#     cursor = conn.cursor()
#     cursor.execute('''CREATE TABLE IF NOT EXISTS todos (
#                         id INTEGER PRIMARY KEY AUTOINCREMENT,
#                         todo_list TEXT NOT NULL)''')
#     conn.commit()
#     conn.close()

# @app.route('/add', methods=['POST'])
# def add_todo():
#     todo_list = request.json.get('todo_list')
#     conn = sqlite3.connect('todos.db')
#     cursor = conn.cursor()
#     cursor.execute("INSERT INTO todos (todo_list) VALUES (?)", (todo_list,))
#     conn.commit()
#     conn.close()
#     return jsonify({"message": "To-do list added!"}), 201

# @app.route('/get', methods=['GET'])
# def get_todos():
#     conn = sqlite3.connect('todos.db')
#     cursor = conn.cursor()
#     cursor.execute("SELECT * FROM todos")
#     todos = cursor.fetchall()
#     conn.close()
#     return jsonify({"todos": [todo[1] for todo in todos]}), 200

# if __name__ == '__main__':
#     init_db()
#     app.run(debug=True)


from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

@app.route('/add', methods=['POST'])
def add_todo():
    # Ensure that the data is sent as JSON and extract the 'todo_list' item
    if not request.json or not 'todo_list' in request.json:
        print("Bad Request: Missing 'todo_list' in request JSON") 
        return jsonify({"message": "Bad Request! 'todo_list' is required."}), 400

    todo_list = request.json.get('todo_list')
    print("Received to-do item:", todo_list)
    

    try:
    # Connect to the SQLite database and insert the new to-do item
        conn = sqlite3.connect('todos.db')
        cursor = conn.cursor()
        cursor.execute("INSERT INTO todos (todo_list) VALUES (?)", (todo_list,))
        conn.commit()
        print("To-do item saved to database.")
        conn.close()
    except Exception as e:
         print("Error:", e)
         return jsonify({"message": "To-do list item added successfully!"}), 201

@app.route('/get', methods=['GET'])
def get_todos():
    # Fetch all to-do items from the database
    conn = sqlite3.connect('todos.db')
    cursor = conn.cursor()
    cursor.execute("SELECT todo_list FROM todos")
    todos = cursor.fetchall()
    conn.close()

    # Return the to-do items as a list of dictionaries
    return jsonify({"todos": [{"todo_list": todo[0]} for todo in todos]})

if __name__ == "__main__":
    app.run(debug=True)

