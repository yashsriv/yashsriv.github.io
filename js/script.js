$(document).ready(function() {
  //$('.collapsible').collapsible();
  //$(header).hide()
  console.log("Document Ready");
  $.ajax({
      // The URL for the request
      url: "./files/science",
      // Whether this is a POST or GET request
      type: "GET",
      // The type of data we expect back
      dataType: "text",
    })
    // Code to run if the request succeeds (is done);
    // The response is passed to the function
    .done(function(text) {
      // get the file contents
      var fileContent = text;
      // split into lines
      var fileContentLines = fileContent.split('%');
      // get a random index (line number)
      var randomLineIndex = Math.floor(Math.random() * fileContentLines.length);
      // extract the value
      var randomLine = fileContentLines[randomLineIndex];
      while (randomLine.match(/.{3,}/) == null) {
        // get a random index (line number)
        randomLineIndex = Math.floor(Math.random() * fileContentLines.length);
        // extract the value
        randomLine = fileContentLines[randomLineIndex];
      }
      // add the random line in a div
      $("#random").html(randomLine);
    })
    // Code to run if the request fails; the raw request and
    // status codes are passed to the function
    .fail(function(xhr, status, errorThrown) {
      $(".quote").hide();
    })
    // Code to run regardless of success or failure;
    .always(function(xhr, status) {});
  $('.scrollspy').scrollSpy();
  $(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
      $('.navbar-fixed').addClass("scrolled")
      //$(header).fadeIn(1000);
    } else if ($(window).scrollTop() < 300) {
      $('.navbar-fixed').removeClass("scrolled")
      //$(header).fadeOut(50);
    }
  });
  $('.parallax').parallax();
  $(".button-collapse").sideNav();
});
