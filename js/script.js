$(document).ready(function() {
  //$('.collapsible').collapsible();
  console.log("Document Ready");
  var request = new XMLHttpRequest();
  request.onload = function() {
    // get the file contents
    var fileContent = this.responseText;
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
    document.getElementById('random-quote').innerHTML = randomLine;
  };
  request.open('GET', './science', true);
  request.send();
});
