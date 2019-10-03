$(document).ready(function(){
  $('#submit').click(function() {
    console.log("click")
    submitData()
  })
})

var submitData = function() {
  var name = $("#enter_name").val()
  var food = $("#select").val()

  if(name == ""){
    alert("Please enter a name.")
    $("#enter_name").val("")
    $("#enter_name").focus()
  }
  else {
    var new_data = {
      "name": name,
      "food": food
    }
    save_data(new_data)
    alert("Don't forget to tell " + name + " to bring " + food + "!")
  }
}

var save_data = function(new_data) {
  $.ajax({
    type: "POST",
    url: "save_data",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(new_data),
    success: function(data, text) {
      var data = data["items"]
      console.log(data)
      window.location.href = 'host'
    },
    error: function(request, status, error) {
      console.log("Error")
      console.log(request)
      console.log(status)
      console.log(error)
    }
  })
}
