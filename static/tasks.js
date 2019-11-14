$(document).ready(function(){
  display_tasks(chores)
  load_chart(guests)

  $(document).on("click", "#enter", function() {
    console.log("click")
    add_task()
    display_tasks(chores)
  })
})

//displays each task in a list of checkboxes
var display_tasks = function(chores) {
  $('#chores').empty()
  console.log("display tasks")

  $.each(chores, function(index, value) {
    var id = index + 1
    var container = $('#chores')

    $('<input />', { type: 'checkbox', id: 'cb'+id, value: value }).appendTo(container);
    $('<label />', { 'for': 'cb'+id, text: value }).appendTo(container);
    $('<br />').appendTo(container);
  })
}

//add task to task list
var add_task = function() {
  var new_task = $('#add_task').val()
  if (new_task == "") {
    alert("Enter a task.")
  }
  else {
    update_task_list(new_task)
    $('#add_task').val("")
  }
}

//update task list on server side
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
    },
    error: function(request, status, error) {
      console.log("Error")
      console.log(request)
      console.log(status)
      console.log(error)
    }
  })
}

var load_chart = function(guests) {
  $('svg').empty()

  //https://blog.risingstack.com/d3-js-tutorial-bar-charts-with-javascript/
  const margin = 60;
  const width = 1000 - 2 * margin;
  const height = 600 - 2 * margin;

  const svg = d3.select('svg');
  const chart = svg.append('g')
    .attr('transform', `translate(${margin}, ${margin})`);

  const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 100]);
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
    .text('[title]')
}
