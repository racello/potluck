$(document).ready(function(){
  display_attendees(items)
  display_info(potluck)

  $(document).on("click", "#find", function() {
    find_entry()
  })
  $("#enter_name").keypress(function(e){
	    if(e.which == 13) {
	        find_entry()
	    }
	})
})

var find_entry = function() {
  var find_me = $('#enter_name').val()
  if (find_me == '') {
    alert("Enter a name first!")
    $('#enter_name').focus()
  }
  else {
    var wanted
    var id = 0
    $.each(items, function(index, value) {
      if (value["name"] == find_me) {
        id = value["id"]
        wanted = document.getElementById(id)
      }
    })
    if (id == 0) {
      alert("No match. Check your spelling or contact your host!")
      $('#enter_name').focus()
    }
    else if ($('#find').text() == "Find") {
      $(wanted).css("background-color", "lightgreen")
      $('#find').text("Clear")
    }
    else {
      $('#enter_name').val('')
      $('#enter_name').focus()
      $(wanted).css("background-color", "white")
      $('#find').text("Find")
    }
  }
}

var display_attendees = function(items) {
  $("#items").empty()

  $.each(items, function(i, item){
    var id = item["id"]
    var row = $("<div class='row entry' id=" + id + ">")

    var col_person = $("<div class='col-md-4'>")
    $(col_person).append(item["name"])
    $(row).append(col_person)

    var col_food = $("<div class='col-md-4' id='" + id + "'>")
    $(col_food).append(item["food"])
    $(row).append(col_food)

    $('#items').prepend(row)
  })
}

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
