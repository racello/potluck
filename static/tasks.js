$(document).ready(function(){
  dropdown_tasks(chores)

  //display_tasks(chores)
  display_guests(guests)
  load_chart(guests, chores)
  display_info(potluck)

  // $(document).on("click", "#enter", function() {
  //   console.log("click")
  //   add_task()
  //   display_tasks(chores)
  // })

//display task info for guest
  $(document).on("click", ".guest_btn", function() {
    $('#task_info').empty()
    var name = $(this).text()

    $.each(guests, function(index, value) {
      if (name == value['name']) {
        $('<h5 id="name">' + value['name'] + '</h5>').appendTo($('#task_info'))
        $('<p> Current tasks: ' + value['tasks'] + '</p>').appendTo($('#task_info'))
      }
    })
    $('#droppick').show()
  })

  //assign new task to guest
  $(document).on("click", "#add", function() {
      var name = $('#name').text()
      var task = $('#mySelect').val()
      var assignment = {
        name: name,
        task: task
      }
      assign_task(assignment)
  })
})

// //displays each guest's name
var display_guests = function(guests) {
  $('#guests').empty()
  $.each(guests, function(index, value) {
    $('<button type="button" class="btn btn-primary guest_btn">' + value['name'] + '</button>').appendTo($('#guests'))
    //$('<a href="guest/' + value["name"] + '"">' + value["name"] + '</a> <br/>').appendTo($('#guests'))
  })
}

//display potluck event_details
var display_info = function(potluck) {
  $('#details').empty()

  var date = $("<div class='row deet'>")
  $(date).append("Date: " + potluck["date"])
  $('#details').append(date)

  var time = $("<div class='row deet'>")
  $(time).append("Time: " + potluck["time"])
  $('#details').append(time)

  var location = $("<div class='row deet'>")
  $(location).append("Location: " + potluck["location"])
  $('#details').append(location)
}

//assign new task to guest
var assign_task = function(assignment) {
  $.ajax({
    type: "POST",
    url: "assign",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(assignment),
    success: function(data, text) {
      var data = data["guests"]
      console.log(data)

      $('#task_info').empty()
      var name = assignment['name']

      $.each(data, function(index, value) {
        if (name == value['name']) {
          console.log(value['tasks'])
          $('<h5 id="name">' + value['name'] + '</h5>').appendTo($('#task_info'))
          $('<p> Current tasks: ' + value['tasks'] + '</p>').appendTo($('#task_info'))
        }
      })

      load_chart(data, chores)
    },
    error: function(request, status, error) {
      console.log("Error")
      console.log(request)
      console.log(status)
      console.log(error)
    }
  })
}

// //displays each task in a list of checkboxes
// var display_tasks = function(chores) {
//   $('#chores').empty()
//   console.log("display tasks")
//
//   $.each(chores, function(index, value) {
//     var id = index + 1
//     var container = $('#chores')
//
//     $('<input />', { type: 'checkbox', id: 'cb'+id, value: value }).appendTo(container);
//     $('<label />', { 'for': 'cb'+id, text: value }).appendTo(container);
//     $('<br />').appendTo(container);
//   })
// }

var dropdown_tasks = function(chores) {
  $('#mySelect').empty()
  $.each(chores, function(index, value) {
    var chore = value["task"] + " (" + value["points"] + ")"
    $('#mySelect').append(
        $('<option></option>').val(chore).html(chore)
    )
  })
  $('#mySelect').change()
}

// //add task to task list
// var add_task = function() {
//   var new_task = $('#add_task').val()
//   if (new_task == "") {
//     alert("Enter a task.")
//   }
//   else {
//     update_task_list(new_task)
//     $('#add_task').val("")
//   }
// }

// //update task list on server side
// var update_task_list = function(new_task) {
//   $.ajax({
//     type: "POST",
//     url: "update_tasks",
//     dataType: "json",
//     contentType: "application/json; charset=utf-8",
//     data: JSON.stringify(new_task),
//     success: function(data, text) {
//       var data = data["chores"]
//       console.log(data)
//     },
//     error: function(request, status, error) {
//       console.log("Error")
//       console.log(request)
//       console.log(status)
//       console.log(error)
//     }
//   })
// }

var load_chart = function(guests, chores) {
  $('svg').empty()

  var total_pts = 0
  $.each(chores, function(index, value) {
    total_pts += value['points']
  })

  //https://blog.risingstack.com/d3-js-tutorial-bar-charts-with-javascript/
  const margin = 60;
  const width = 1000 - 2 * margin;
  const height = 600 - 2 * margin;

  const svg = d3.select('svg');
  const chart = svg.append('g')
    .attr('transform', `translate(${margin}, ${margin})`);

  const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0, total_pts]);
  chart.append('g')
    .call(d3.axisLeft(yScale));
  const xScale = d3.scaleBand()
    .range([0, width])
    .domain(guests.map((s) => s.name))
    .padding(0.2)

  chart.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

  chart.selectAll()
    .data(guests)
    .enter()
    .append('rect')
    .attr('x', (s) => xScale(s.name))
    .attr('y', (s) => yScale(s.points))
    .attr('height', (s) => height - yScale(s.points))
    .attr('width', xScale.bandwidth())

  svg.append('text')
    .attr('x', -(height / 2) - margin)
    .attr('y', margin / 2.4)
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text('Task Meter')

  svg.append('text')
    .attr('class', 'label')
    .attr('x', width / 2 + margin)
    .attr('y', height + margin * 1.7)
    .attr('text-anchor', 'middle')
    .text('Attendees')

  svg.append('text')
    .attr('x', width / 2 + margin)
    .attr('y', 40)
    .attr('text-anchor', 'middle')
    .text('Task Balance')
}
