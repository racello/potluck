from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

current_id = 26

potluck = {}

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
guests = len(items)

#no longer in use but just keep here for sake of ease lol
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
];

@app.route('/')
def home():
   return render_template('home.html', potluck = potluck, guests = guests, items = items, current_id = current_id, food = food)

@app.route('/tasks')
def tasks(name=None):
    return render_template('tasks.html', potluck=potluck, guests=guests, items=items, current_id=current_id, food=food)

@app.route('/host')
def host(name=None):
    return render_template('host.html', potluck = potluck, guests = guests, items = items, current_id = current_id, food = food)

@app.route('/attend')
def attend(name=None):
    return render_template('attend.html', potluck = potluck, guests = guests, items = items, current_id = current_id, food = food)

@app.route('/details')
def details(name=None):
    return render_template('details.html', potluck = potluck, guests = guests, items = items, current_id = current_id, food = food)

@app.route('/addmeat')
def addmeat(name=None):
    return render_template('addmeat.html', potluck = potluck, guests = guests, items = items, current_id = current_id, food = food)

@app.route('/addveggie')
def addveggie(name=None):
    return render_template('addveggie.html', potluck = potluck, guests = guests, items = items, current_id = current_id, food = food)

@app.route('/addgrain')
def addgrain(name=None):
    return render_template('addgrain.html', potluck = potluck, guests = guests, items = items, current_id = current_id, food = food)

@app.route('/addapp')
def addapp(name=None):
    return render_template('addapp.html', potluck = potluck, guests = guests, items = items, current_id = current_id, food = food)

@app.route('/adddessert')
def adddessert(name=None):
    return render_template('adddessert.html', potluck = potluck, guests = guests, items = items, current_id = current_id, food = food)

@app.route('/adddrink')
def adddrink(name=None):
    return render_template('adddrink.html', potluck = potluck, guests = guests, items = items, current_id = current_id, food = food)

@app.route('/addsupplies')
def addsupplies(name=None):
    return render_template('addsupplies.html', potluck = potluck, guests = guests, items = items, current_id = current_id, food = food)

@app.route('/addother')
def addother(name=None):
    return render_template('addother.html', potluck = potluck, guests = guests, items = items, current_id = current_id, food = food)

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
    global guests

    new_data = request.get_json()
    new_data["id"] = current_id
    current_id += 1
    guests += 1

    items.append(new_data)

    #update food list
    new_food = new_data["food"]
    if new_food not in food:
        food.append(new_food)

    return jsonify(potluck = potluck, guests = guests, items = items, current_id = current_id, food = food)

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

    return jsonify(potluck = potluck, guests = guests, current_id = current_id, items = items, food = food)

@app.route('/delete_item', methods=['GET', 'POST'])
def delete_item():
    global items
    global food
    global guests

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

    guests = guests - 1

    return jsonify(potluck = potluck, guests = guests, current_id = current_id, items = items, food = food)

if __name__ == "__main__":
    app.run(host='0.0.0.0')
