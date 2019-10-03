from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

current_id = 31

potluck = {}

items = [
    {
        "id": 1,
        "name": "Yuval",
        "food": "veggies",
        "quantity": 100
    },
    {
        "id": 2,
        "name": "Christina",
        "food": "cherries",
        "quantity": 40
    },
    {
        "id": 3,
        "name": "Bill",
        "food": "beer",
        "quantity": 6
    },
    {
        "id": 4,
        "name": "Julien",
        "food": "juice",
        "quantity": 1
    },
    {
        "id": 5,
        "name": "Jeff",
        "food": "melon drink",
        "quantity": 1
    },
    {
        "id": 6,
        "name": "Bri",
        "food": "bread",
        "quantity": 1
    },
    {
        "id": 7,
        "name": "Ning",
        "food": "noodles",
        "quantity": 50
    },
    {
        "id": 8,
        "name": "Gabby",
        "food": "cookies",
        "quantity": 20
    },
    {
        "id": 9,
        "name": "Joslyn",
        "food": "tea",
        "quantity": 1
    },
    {
        "id": 10,
        "name": "Malik",
        "food": "chips",
        "quantity": 60
    },
    {
        "id": 11,
        "name": "Jahlin",
        "food": "ramen",
        "quantity": 5
    },
    {
        "id": 12,
        "name": "Sophia",
        "food": "chocolate",
        "quantity": 3
    },
    {
        "id": 13,
        "name": "Anthony",
        "food": "cheetos",
        "quantity": 2
    },
    {
        "id": 14,
        "name": "Amanda",
        "food": "dumplings",
        "quantity": 25
    },
    {
        "id": 15,
        "name": "Yijun",
        "food": "soju",
        "quantity": 4
    },
    {
        "id": 16,
        "name": "Justin",
        "food": "rice crackers",
        "quantity": 50
    },
    {
        "id": 17,
        "name": "T",
        "food": "tangerines",
        "quantity": 30
    },
    {
        "id": 18,
        "name": "Cher",
        "food": "gummies",
        "quantity": 35
    },
    {
        "id": 19,
        "name": "Sachi",
        "food": "candy",
        "quantity": 100
    },
    {
        "id": 20,
        "name": "Kelly",
        "food": "butter mochi",
        "quantity": 50
    },
    {
        "id": 21,
        "name": "Cameron",
        "food": "beans",
        "quantity": 500
    },
    {
        "id": 22,
        "name": "Colin",
        "food": "stir fry",
        "quantity": 1
    },
    {
        "id": 23,
        "name": "Siena",
        "food": "fruit",
        "quantity": 10
    },
    {
        "id": 24,
        "name": "Lily",
        "food": "pastries",
        "quantity": 5
    },
    {
        "id": 25,
        "name": "Olivia",
        "food": "boba",
        "quantity": 15
    },
    {
        "id": 26,
        "name": "Billy",
        "food": "napkins",
        "quantity": 100
    },
    {
        "id": 27,
        "name": "Celena",
        "food": "utensils",
        "quantity": 200
    },
    {
        "id": 28,
        "name": "Perrin",
        "food": "orange juice",
        "quantity": 1
    },
    {
        "id": 29,
        "name": "Katie",
        "food": "eggs",
        "quantity": 100
    },
    {
        "id": 30,
        "name": "Hannah",
        "food": "cheese",
        "quantity": 20
    },
]

food = [
    "veggies",
    "cherries",
    "beer",
    "juice",
    "melon drink",
    "bread",
    "noodles",
    "cookies",
    "tea",
    "chips",
    "ramen",
    "chocolate",
    "cheetos",
    "dumplings",
    "soju",
    "rice crackers",
    "tangerines",
    "gummies",
    "candy",
    "butter mochi",
    "beans",
    "stir fry",
    "fruit",
    "pastries",
    "boba",
    "napkins",
    "utensils",
    "orange juice",
    "eggs",
    "cheese",
];

@app.route('/')
def home():
   return render_template('home.html', potluck = potluck, items = items, food = food)

@app.route('/host')
def host(name=None):
    return render_template('host.html', potluck = potluck, items = items, food = food)

@app.route('/attend')
def attend(name=None):
    return render_template('attend.html', potluck = potluck, items = items, food = food)

@app.route('/details')
def details(name=None):
    return render_template('details.html', potluck = potluck, items = items, food = food)

@app.route('/save_info', methods=['GET', 'POST'])
def save_info():
    global potluck

    event_details = request.get_json()
    potluck["date"] = event_details["date"]
    potluck["time"] = event_details["time"]
    potluck["location"] = event_details["location"]

    return jsonify(potluck = potluck)

@app.route('/save_data', methods=['GET', 'POST'])
def save_data():
    global items
    global current_id
    global food

    new_data = request.get_json()
    new_data["id"] = current_id
    current_id += 1

    items.append(new_data)

    #update food list
    new_food = new_data["food"]
    if new_food not in food:
        food.append(new_food)

    return jsonify(potluck = potluck, items = items, food = food)

@app.route('/update_quant', methods=['GET', 'POST'])
def update_quant():
    global items
    global food

    rewrite = request.get_json()
    name = rewrite[0]
    updated = rewrite[1]

    for i in range(len(items)):
        d = items[i]
        for key, value in d.items():
            if value == name:
                d["quantity"] = updated

    return jsonify(potluck = potluck, items = items, food = food)

#update food
@app.route('/update_data', methods=['GET', 'POST'])
def update_data():
    global items
    global food

    rewrite = request.get_json()
    name = rewrite[0]
    updated = rewrite[1]

    for i in range(len(items)):
        d = items[i]
        for key, value in d.items():
            if value == name:
                d["food"] = updated

    if updated not in food:
        food.append(updated)

    return jsonify(potluck = potluck, items = items, food = food)

@app.route('/delete_item', methods=['GET', 'POST'])
def delete_item():
    global items
    global food

    id_json = request.get_json()
    delete_id = int(id_json["id"])

    #delete item from food list
    for i in range(len(items)):
        d = items[i]
        for key, value in d.items():
            if value == delete_id:
                delete_food = d["food"]

    food.remove(delete_food)

    #delete from items list
    index_to_delete = None
    for (i, item) in enumerate(items):
        item_id = item["id"]
        if item_id == delete_id:
            index_to_delete = i
            break

    if index_to_delete is not None:
        del items[index_to_delete]

    return jsonify(potluck = potluck, items = items, food = food)

if __name__ == "__main__":
    app.run(host='0.0.0.0')
