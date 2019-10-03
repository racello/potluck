$(function() {
  $( "#datepicker-1" ).datepicker()
});

$(document).ready(function(){
  $(document).on("click", "#enter", function() {
    enter_info()
  })
})

var enter_info = function() {
  var date = $("#datepicker-1").val()
  var time = document.getElementById("mySelect").value
  var location = $("#enter_location").val()

  var details = {
    "date": date,
    "time": time,
    "location": location
  }
  save_info(details)
}

var save_info = function(details) {
  $.ajax({
    type: 'POST',
    url: "save_info",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(details),
    success: function(all_info, text) {
      var all_info = all_info["potluck"]
      console.log(all_info)
    },
    error: function(request, status, error) {
      console.log("Error")
      console.log(request)
      console.log(status)
      console.log(error)
    }
  })

}
