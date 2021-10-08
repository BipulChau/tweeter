$(document).ready(function () {
  $("#tweet-text").on("input", function (event) {
    let length = $(this).val().length;

    let max = 140;
    $(this)
      .parent()
      .children(".justTwitIt")
      .children(".counter")
      .text(140 - length);
    if (length > max) {
      $(this)
        .parent()
        .children(".justTwitIt")
        .children(".counter")
        .addClass("red");
    }
    if (length <= max) {
      $(this)
        .parent()
        .children(".justTwitIt")
        .children(".counter")
        .removeClass("red");
    }
  });
});
