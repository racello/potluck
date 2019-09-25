$(document).ready(function(){
  display_attendees(items)

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

    var col_person = $("<div class='col-md-2'>")
    $(col_person).append(item["name"])
    $(row).append(col_person)

    var col_food = $("<div class='col-md-2' id='" + id + "'>")
    $(col_food).append(item["food"])
    $(row).append(col_food)

    var col_quantity = $("<div class='col-md-2' id='" + id + "'>")
    $(col_quantity).append(item["quantity"])
    $(row).append(col_quantity)

    $('#items').prepend(row)
  })
}
