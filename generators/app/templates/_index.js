var five = require("johnny-five");
var board = new five.Board();
<% if ( includeNodePixel ){ %>var pixel = require("node-pixel");<% } %>
<% if ( includeBarcli ) { %>var barcli = require("barcli");<% } %>

// The board's pins will not be accessible until
// the board has reported that it is ready
board.on("ready", function() {
  console.log("Ready!");

  var led = new five.Led(13);
  led.blink(500);
});
