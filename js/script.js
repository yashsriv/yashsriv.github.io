function setupStarField() {
  var section = document.getElementById("intro-controller");
  var cs = getComputedStyle(section);
  var c = document.getElementById("starfield");
  c.width = parseInt(cs.getPropertyValue('width'), 10);
  c.height = parseInt(cs.getPropertyValue('height'), 10);
  var ctx = c.getContext("2d");
  ctx.imageSmoothingEnabled = true;
  var board = new Board(100, new Vector(c.width, c.height));
  board.draw(ctx);
  setInterval(function() {
    board.loop(ctx);
  }, 30);
}

$(document).ready(function() {
  console.log("Document Ready");

  // Load Quote
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
      while (randomLine.match(/.{3,}/) === null) {
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

  // Setup hidden navbar
  $(window).scroll(function() {
    var h = window.innerHeight;
    if ($(window).scrollTop() > h / 3.6) {
      $('.navbar-fixed').addClass("scrolled");
    } else if ($(window).scrollTop() < h / 3.6) {
      $('.navbar-fixed').removeClass("scrolled");
    }
  });

  //setupStarField();

  // Setup Materialize
  $('.scrollspy').scrollSpy();
  $('.parallax').parallax();
  $(".button-collapse").sideNav();
});
