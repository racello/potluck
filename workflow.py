from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

chores = [
    "Wash the dishes",
    "Set the table",
    "Bring drinks",
    "Bring dessert",
    "Cook food",
]

guests = [
    {
        "name": "Yuval",
        "tasks": [],
        "points": 100
    },
    {
        "name": "Christina",
        "tasks": [],
        "points": 50
    },
    {
        "name": "Julien",
        "tasks": [],
        "points": 25
    },
    {
        "name": "Ning",
        "tasks": [],
        "points": 75
    },
]

@app.route('/tasks')
def tasks(name=None):
    return render_template('tasks.html', guests=guests, chores=chores)

@app.route('/update_tasks', methods=['GET', 'POST'])
def update_tasks():
    global chores

    new_task = request.get_json()
    chores.append(new_task)

    return jsonify(guests=guests, chores=chores)

if __name__ == "__main__":
    app.run(host='0.0.0.0')
