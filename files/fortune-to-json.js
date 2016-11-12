/* jshint esversion:6 */
/* jshint node: true */
'use strict';

var fs = require("fs");

fs.readFile('science', 'utf8', (err, data) => {
  if (err) throw err;
  var fileContentLines = data.split('%');
  console.log(JSON.stringify(fileContentLines));
});
