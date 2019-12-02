$(document).ready(function() {
  guest_info(guest_name)
})

var guest_info = function(guest_name) {
  $.each(guests, function(index, value) {
    if (guest_name == value['name']) {
      $('#name').append(value['name'])
      $('#tasks').append(value['tasks'])
      $('#points').append(value['points'])
    }
  })
}
