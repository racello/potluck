$(document).ready(function(){
  display_data(items)

  //save new data
  $(document).on("click", "#submit", function() {
    submitData()
  })

  //edit existing data
  $(document).on("click", ".edit", function() {
    var this_id = $(this).data("id")
    var edit_me = document.getElementById(this_id)
    var edit_num = edit_me.nextSibling
    //begin editing
    if ($(this).text() == "Edit") {
      edit_me.contentEditable = true
      edit_num.contentEditable = true
      $(edit_me).css('background-color', 'lightyellow')
      $(edit_num).css('background-color', 'lightyellow')
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
      else if (!$.isNumeric(edit_num.textContent)) {
        alert("Please enter a numerical quantity!")
        edit_num.focus()
      }
      else {
        edit_me.contentEditable = false
        edit_num.contentEditable = false
        $(edit_me).css('background-color', 'white')
        $(edit_num).css('background-color', 'white')
        $(this).text("Edit")

        //save edited content to database
        var name = edit_me.previousSibling.textContent
        var updated_food = edit_me.textContent
        var updated_quant = edit_num.textContent
        var rewrite_food = [name, updated_food]
        var rewrite_quant = [name, updated_quant]
        update_data(rewrite_food) //update food
        update_quant(rewrite_quant)
      }
    }
  })

  //search existing data (food)
  $("#enter_food").autocomplete({
    source: food
  })
})

var update_quant = function(rewrite) {
  $.ajax({
    type: "POST",
    url: "update_quant",
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

    var col_quantity = $("<div class='col-md-1' id='" + id + "'>")
    $(col_quantity).append(item["quantity"])
    $(row).append(col_quantity)

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

var submitData = function() {
  var name = $("#enter_name").val()
  var food = $("#enter_food").val()
  var quantity = $("#enter_quant").val()

  if(name == ""){
    alert("Please enter a name.")
    $("#enter_name").val("")
    $("#enter_name").focus()
  }
  else if (food == "") {
    alert("No slackers! Everyone brings something to a potluck.")
    $("#enter_food").val("")
    $("#enter_food").focus()
  }
  else if (!$.isNumeric(quantity)) {
    alert("'Quantity' means numeric value, you fool.")
    $("#enter_quant").focus()
  }
  else {
    var new_data = {
      "name": name,
      "food": food,
      "quantity": quantity
    }
    save_data(new_data)
    alert("Don't forget to tell " + name + " to bring " + quantity + " of " + food + "!")
  }
}

var save_data = function(new_data) {
  $.ajax({
    type: "POST",
    url: "save_data",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(new_data),
    success: function(data ,text) {
      var data = data["items"]
      display_data(data)
      console.log(data)
      $("#enter_name").val("")
      $("#enter_food").val("")
      $("#enter_quant").val("")
    },
    error: function(request, status, error) {
      console.log("Error")
      console.log(request)
      console.log(status)
      console.log(error)
    }
  })
}
