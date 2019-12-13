from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

potluck = {}
chores = []
guests = []

#0 = false, 1 = true
# chores = [
#     {
#         "task": "Wash the dishes",
#         "assigned": 1,
#         "points": 25
#     },
#     {
#         "task": "Set the table",
#         "assigned": 1,
#         "points": 25
#     },
#     {
#         "task": "Bring drinks",
#         "assigned": 1,
#         "points": 75
#     },
#     {
#         "task": "Bring dessert",
#         "assigned": 1,
#         "points": 25
#     },
#     {
#         "task": "Cook food",
#         "assigned": 1,
#         "points": 100
#     },
# ]
#
# guests = [
#     {
#         "name": "Yuval",
#         "tasks": ["Cook food (100)"],
#         "points": 100
#     },
#     {
#         "name": "Christina",
#         "tasks": ["Bring dessert (25)", "Set the table (25)"],
#         "points": 50
#     },
#     {
#         "name": "Julien",
#         "tasks": ["Wash the dishes (25)"],
#         "points": 25
#     },
#     {
#         "name": "Ning",
#         "tasks": ["Bring drinks (75)"],
#         "points": 75
#     },
# ]

@app.route('/')
def home():
    return render_template('home.html', potluck=potluck, guests=guests, chores=chores)

@app.route('/tasklist')
def tasklist(name=None):
    return render_template('tasklist.html', potluck=potluck, guests=guests, chores=chores)

@app.route('/tasks')
def tasks(name=None):
    return render_template('tasks.html', potluck=potluck, guests=guests, chores=chores)

@app.route('/update_tasks', methods=['GET', 'POST'])
def update_tasks():
    global chores
    new_task = request.get_json()
    task = new_task['task']
    assigned = new_task['assigned']
    points = int(new_task['points'])

    chore = {
        'task': task,
        'assigned': assigned,
        'points': points
    }
    chores.append(chore)
    return jsonify(potluck=potluck, guests=guests, chores=chores)

@app.route('/delete_task', methods=['GET', 'POST'])
def delete_task():
    global chores
    global guests
    bye = request.get_json()

    for c in chores:
        if bye == c['task']:
            points = c['points']
            chores.remove(c)

    #delete task from guest, adjust guest's points
    for g in guests:
        for t in g['tasks']:
            if bye == t[:-5]:
                g['tasks'].remove(t)
                g['points'] -= points

    return jsonify(potluck=potluck, guests=guests, chores=chores)

@app.route('/assign', methods=['GET', 'POST'])
def assign():
    global guests
    global chores

    assignment = request.get_json()
    name = assignment['name']
    task = assignment['task']
    points = int (task[-3:-1])

    print(task[:-5]) #get task name without (pts) at end
    for c in chores:
        #if the task name matches and is not already assigned
        if task[:-5] == c['task'] and c['assigned'] == 0:
            c['assigned'] = 1
            print(chores)
            for g in guests:
                #add task to guest's assignments
                if name == g['name']:
                    g['tasks'].append(task)
                    g['points'] += points

    return jsonify(potluck=potluck, guests=guests, chores=chores)

@app.route('/guestlist')
def guestlist(name=None):
    return render_template('guestlist.html', potluck=potluck, guests=guests, chores=chores)

@app.route('/add_guest', methods=['GET', 'POST'])
def add_guest():
    global guests
    name = request.get_json()

    guest_info = {}
    guest_info['name'] = name
    guest_info['tasks'] = []
    guest_info['points'] = 0
    guests.append(guest_info)

    return jsonify(potluck=potluck, guests=guests, chores=chores)

@app.route('/delete_guest', methods=['GET', 'POST'])
def delete_guest():
    global guests
    global chores
    name = request.get_json()

    for g in guests:
        if name == g['name']:
            guest_tasks = g['tasks']
            guests.remove(g)

    #any tasks assigned to deleted guest are now unassigned
    for t in guest_tasks:
        for c in chores:
            if t[:-5] == c['task']:
                c['assigned'] = 0

    return jsonify(potluck=potluck, guests=guests, chores=chores)

#honestly probably don't need this lol
@app.route('/guest/<guest_name>')
def guest(guest_name=None):
    return render_template('guest.html', guest_name=guest_name, potluck=potluck, guests=guests, chores=chores)

@app.route('/host')
def host(name=None):
    return render_template('host.html', potluck=potluck, guests=guests, chores=chores)

@app.route('/attend')
def attend(name=None):
    return render_template('attend.html', potluck=potluck, guests=guests, chores=chores)

@app.route('/details')
def details(name=None):
    return render_template('details.html', potluck=potluck, guests=guests, chores=chores)

@app.route('/addmeat')
def addmeat(name=None):
    return render_template('addmeat.html', potluck=potluck, guests=guests, chores=chores)

@app.route('/addveggie')
def addveggie(name=None):
    return render_template('addveggie.html', potluck=potluck, guests=guests, chores=chores)

@app.route('/addgrain')
def addgrain(name=None):
    return render_template('addgrain.html', potluck=potluck, guests=guests, chores=chores)

@app.route('/addapp')
def addapp(name=None):
    return render_template('addapp.html', potluck=potluck, guests=guests, chores=chores)

@app.route('/adddessert')
def adddessert(name=None):
    return render_template('adddessert.html', potluck=potluck, guests=guests, chores=chores)

@app.route('/adddrink')
def adddrink(name=None):
    return render_template('adddrink.html', potluck=potluck, guests=guests, chores=chores)

@app.route('/addsupplies')
def addsupplies(name=None):
    return render_template('addsupplies.html', potluck=potluck, guests=guests, chores=chores)

@app.route('/addother')
def addother(name=None):
    return render_template('addother.html', potluck=potluck, guests=guests, chores=chores)

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
