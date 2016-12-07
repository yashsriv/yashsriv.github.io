function navbar() {
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  var vmin = Math.min(w, h);
  // Setup hidden navbar
  $(window).scroll(function() {
    var h = window.innerHeight;
    if ($(window).scrollTop() > vmin / 2) {
      $('.navbar-fixed').addClass("scrolled");
    } else if ($(window).scrollTop() < vmin / 2) {
      $('.navbar-fixed').removeClass("scrolled");
    }
  });

}
$(document).ready(function() {
  navbar();
  $(".button-collapse").sideNav();
  $(".card").matchHeight();
});
