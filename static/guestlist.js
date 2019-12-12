$(document).ready(function(){
  display_guests(guests)

  $(document).on("click", "#enter", function() {
    name = $('#invite_guest').val()
    if (name == '') {
      alert('Please enter a name first.')
      $('#invite_guest').focus()
    }
    else {
      add_guest(name)
    }
  })

  $(document).on("click", "#next", function() {
    window.location.href = 'tasklist'
  })
})

var add_guest = function(name) {
  $.ajax({
    type: "POST",
    url: "add_guest",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(name),
    success: function(data, text) {
      var data = data["guests"]
      console.log(data)
      display_guests(data)
      $('#invite_guest').val('')
    },
    error: function(request, status, error) {
      console.log("Error")
      console.log(request)
      console.log(status)
      console.log(error)
    }
  })
}

var display_guests = function(guests) {
  $('#guestlist').empty()
  $.each(guests, function(index, value) {
    var row = $("<div class='row guestrow'>")

    var col_guest = $("<div class='col-md-2'>")
    $(col_guest).append(value['name'])
    $(row).append(col_guest)

    var delete_button = $("<button class='btn btn-danger'> X </button>")
    $(delete_button).click(function() {
      var bye = this.previousSibling.innerHTML
      delete_guest(bye)
    })
    $(row).append(delete_button)

    $('#guestlist').append(row)
  })
}

var delete_guest = function(name) {
  $.ajax({
    type: "POST",
    url: "delete_guest",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(name),
    success: function(data, text) {
      var data = data['guests']
      console.log(data)
      display_guests(data)
    },
    error: function(request, status, error) {
      console.log("Error")
      console.log(request)
      console.log(status)
      console.log(error)
    }
  })
}
