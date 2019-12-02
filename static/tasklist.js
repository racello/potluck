$(document).ready(function(){
  display_tasks(chores)

  $(document).on("click", "#enter", function() {
    add_task()
  })

  $(document).on("click", "#next", function() {
    window.location.href = 'tasks'
  })
})

//displays each task in a list of checkboxes
var display_tasks = function(chores) {
  $('#chores').empty()
  console.log(chores)

  $.each(chores, function(index, value) {
    var id = index + 1
    var container = $('#chores')
    $('<input />', { type: 'checkbox', id: 'cb'+id, value: value["task"]}).appendTo(container);
    $('<label />', { 'for': 'cb'+id, text: value["task"] + " (" + value["points"] + ")"}).appendTo(container);
    if (value['assigned'] == 1) {
      console.log("check box")
      $('#cb' + id).prop('checked', true)
    }
    $('<br />').appendTo(container);
  })
}

//add task to task list
var add_task = function() {
  var task_name = $('#add_task').val()
  var task_pts = $('#task_pts').val()
  if (task_name == "" || task_pts == "") {
    alert("Enter a task and its point value.")
  }
  else if ($.isNumeric(task_pts) == false) {
    alert("Point values must be integers.")
    $('#task_pts').focus()
  }
  else {
    new_task = {
      "task": task_name,
      "assigned": 0,
      "points": task_pts
    }
    console.log(new_task)
    update_task_list(new_task)
    $('#add_task').val("")
    $('#task_pts').val("")
  }
}

var update_task_list = function(new_task) {
  $.ajax({
    type: "POST",
    url: "update_tasks",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(new_task),
    success: function(data, text) {
      var data = data["chores"]
      console.log(data)
      display_tasks(data)
    },
    error: function(request, status, error) {
      console.log("Error")
      console.log(request)
      console.log(status)
      console.log(error)
    }
  })
}
