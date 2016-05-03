$(document).ready(function() {
  console.log("Document Ready");
  var request = new XMLHttpRequest();
  request.onload = function() {
    // get the file contents
    var fileContent = this.responseText;
    // split into lines
    var fileContentLines = fileContent.split('##########');
    var blog = "";
    for (var i = 0; i < fileContentLines.length - 1; i++) {
      var line = fileContentLines[i];
      var heading = line.split('#####')[0];
      var subheading = line.split('#####')[1];
      var date = line.split('#####')[2];
      var body = line.split('#####')[3];
      blog += "<h3> " + heading + " </h3> <br>";
      blog += "<h4> " + subheading + " </h4> <br><hr>";
      blog += "<h5> " + date + " </h5><br>";
      blog += body.replace(/  \n/g, "<br>\n");
      blog += "<br><br><hr>";
    }
    // add the random line in a div
    document.getElementById('blog').innerHTML = blog;
  };
  request.open('GET', './my.blog', true);
  request.send();
});
