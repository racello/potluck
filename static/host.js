$(document).ready(function(){
  display_data(items)
  display_info(potluck)

  //add protein
  $('#meat').click(function() {
    window.location.href = 'addmeat'
  })
  //add vegetable
  $('#veggie').click(function() {
    window.location.href = 'addveggie'
  })
  //add grain
  $('#grain').click(function() {
    window.location.href = 'addgrain'
  })
  //add appetizer
  $('#appetizer').click(function() {
    window.location.href = 'addapp'
  })
  //add dessert
  $('#dessert').click(function() {
    window.location.href = 'adddessert'
  })
  //add drink
  $('#drink').click(function() {
    window.location.href = 'adddrink'
  })
  //add supplies
  $('#supplies').click(function() {
    window.location.href = 'addsupplies'
  })
  //add addother
  $('#other').click(function() {
    window.location.href = 'addother'
  })

  //edit existing data
  $(document).on("click", ".edit", function() {
    var this_id = $(this).data("id")
    var edit_me = document.getElementById(this_id)
    //begin editing
    if ($(this).text() == "Edit") {
      edit_me.contentEditable = true
      $(edit_me).css('background-color', 'lightyellow')
      $(edit_me).focus()
      $(this).text("Done")
    }
    //finish editing
    else {
      //catch errors
      if ($.isNumeric(edit_me.textContent)) {
        alert("Please enter a food or drink.")
        edit_me.focus()
      }
      else {
        edit_me.contentEditable = false
        $(edit_me).css('background-color', 'white')
        $(this).text("Edit")

        //save edited content to database
        var name = edit_me.previousSibling.textContent
        var updated_food = edit_me.textContent
        var rewrite_food = [name, updated_food]
        update_data(rewrite_food) //update food
      }
    }
  })

  //search existing data (food)
  $("#enter_food").autocomplete({
    source: food
  })
})

//update food
var update_data = function(rewrite) {
  $.ajax({
    type: "POST",
    url: "update_data",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(rewrite),
    success: function(data, text) {
      var data = data["items"]
      display_data(data)
    },
    error: function(request, status, error) {
      console.log("Error")
      console.log(request)
      console.log(status)
      console.log(error)
    }
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

var display_data = function(items) {
  $("#items").empty()

  $.each(items, function(i, item){
    var id = item["id"]
    var row = $("<div class='row entry'>")

    var col_person = $("<div class='col-md-2'>")
    $(col_person).append(item["name"])
    $(row).append(col_person)

    var col_food = $("<div class='col-md-2' id='" + id + "'>")
    $(col_food).append(item["food"])
    $(row).append(col_food)

    var col_edit = $("<div class='col-md-1 text-center'>")
    var edit_button = $("<button class='btn btn-info edit' data-id='" + id + "'>Edit</button>")
    $(col_edit).append(edit_button)
    $(row).append(col_edit)

    var col_delete = $("<div class='col-md-1 text-center'>")
    var delete_button = $("<button class='btn btn-danger' data-id='" + id + "'>X</button>")
    $(delete_button).click(function() {
      var this_id = $(this).data("id")
      delete_item(this_id)
    })
    $(col_delete).append(delete_button)
    $(row).append(col_delete)

    $('#items').prepend(row)
  })
}

var delete_item = function(id) {
  $.ajax({
    type: "POST",
    url: "delete_item",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({"id" : id}),
    success: function(data, text) {
      var data = data["items"]
      display_data(data)
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
