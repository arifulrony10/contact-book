$("#info-modal-container").removeClass("open");
$("#modal-container").removeClass("open");

// open modal
$("#add-contact-btn").click(() => {
  $("#modal-container").addClass("open");
});

// close modal
$(".modal-close-btn").click(() => {
  $("#info-modal-container").removeClass("open");
  $("#modal-container").removeClass("open");
});

// prevent form default
$("form").click(function (event) {
  event.preventDefault();
});
