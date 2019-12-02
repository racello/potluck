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
#store here in case we need it again in other server file (myproject.py)
items = [
    {
        "id": 1,
        "name": "Yuval",
        "food": "veggies"
    },
    {
        "id": 2,
        "name": "Christina",
        "food": "cherries"
    },
    {
        "id": 3,
        "name": "Bill",
        "food": "beer"
    },
    {
        "id": 4,
        "name": "Julien",
        "food": "juice"
    },
    {
        "id": 5,
        "name": "Jeff",
        "food": "melon drink"
    },
    {
        "id": 6,
        "name": "Bri",
        "food": "bread"
    },
    {
        "id": 7,
        "name": "Ning",
        "food": "noodles"
    },
    {
        "id": 8,
        "name": "Gabby",
        "food": "cookies"
    },
    {
        "id": 9,
        "name": "Joslyn",
        "food": "tea"
    },
    {
        "id": 10,
        "name": "Malik",
        "food": "chips"
    },
    {
        "id": 11,
        "name": "Jahlin",
        "food": "ramen"
    },
    {
        "id": 12,
        "name": "Sophia",
        "food": "chocolate"
    },
    {
        "id": 13,
        "name": "Anthony",
        "food": "cheetos"
    },
    {
        "id": 14,
        "name": "Amanda",
        "food": "dumplings"
    },
    {
        "id": 15,
        "name": "Yijun",
        "food": "soju"
    },
    {
        "id": 16,
        "name": "Justin",
        "food": "rice crackers"
    },
    {
        "id": 17,
        "name": "T",
        "food": "tangerines"
    },
    {
        "id": 18,
        "name": "Cher",
        "food": "gummies"
    },
    {
        "id": 19,
        "name": "Sachi",
        "food": "candy"
    },
    {
        "id": 20,
        "name": "Kelly",
        "food": "butter mochi"
    },
    {
        "id": 21,
        "name": "Cameron",
        "food": "beans"
    },
    {
        "id": 22,
        "name": "Colin",
        "food": "stir fry"
    },
    {
        "id": 23,
        "name": "Siena",
        "food": "fruit"
    },
    {
        "id": 24,
        "name": "Lily",
        "food": "pastries"
    },
    {
        "id": 25,
        "name": "Olivia",
        "food": "boba"
    },
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
