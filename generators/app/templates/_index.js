var five = require("johnny-five");
<% if ( useParticle ) { %>var board = new five.Board({
  io: new Spark({
    token: process.env.SPARK_TOKEN,
    deviceId: process.env.SPARK_DEVICE_ID
  });
});<% } else if ( useRasPi ) { %>var board = new five.Board({
  io: new Raspi()
});<% } else {
%>var board = new five.Board();<% } %>

<% if ( includeNodePixel ){ %>var pixel = require("node-pixel");<% } %>
<% if ( includeBarcli ) { %>var barcli = require("barcli");<% } %>
<% if ( includeOledJS ) { %>var Oled = require("oled-js");<% } %>

// The board's pins will not be accessible until
// the board has reported that it is ready
board.on("ready", function() {
  console.log("Ready!");

  <% if ( includeOledJS ) { %>
  var opts = {
    width: 128,
    height: 64,
    address: 0x3D
  };

  var oled = new Oled(board, five, opts);
  <% } %>
  var led = new five.Led(13);
  led.blink(500);
});
