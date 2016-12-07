var currentdp = 0;

function setupQuote() {
  // Load Quote
  $.ajax({
      // The URL for the request
      url: "./files/science.json",
      // Whether this is a POST or GET request
      type: "GET",
      // The type of data we expect back
      dataType: "json"
    })
    // Code to run if the request succeeds (is done);
    // The response is passed to the function
    .done(function(data) {
      // split into lines
      var fileContentLines = data;
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
      $("#random").html(jQuery.parseHTML(randomLine));
    })
    // Code to run if the request fails; the raw request and
    // status codes are passed to the function
    .fail(function(xhr, status, errorThrown) {
      $(".quote").hide();
    })
    // Code to run regardless of success or failure;
    .always(function(xhr, status) {});

}

function navbar() {

  // Setup hidden navbar
  $(window).scroll(function() {
    var h = window.innerHeight;
    if ($(window).scrollTop() > h / 3.6) {
      $('.navbar-fixed').addClass("scrolled");
    } else if ($(window).scrollTop() < h / 3.6) {
      $('.navbar-fixed').removeClass("scrolled");
    }
  });

}

function toggleDP() {
  var src = ($("#dp").attr('src') === 'images/profile.png') ?
    'images/dp.svg' : 'images/profile.png';
  $("#dp").attr('src', src);
}

$(document).ready(function() {

  setupQuote();
  navbar();

  if (window.innerWidth < 600) {
    $('.tooltipped').tooltip('remove');
  }

  // Setup Materialize
  $('.scrollspy').scrollSpy();
  $('.parallax').parallax();
  $(".button-collapse").sideNav();
});
