var five = require("johnny-five");<%
if (projectType === "useParticle") { %>
var Spark = require("spark-io");
var board = new five.Board({
  // Create Johnny-Five board connected via Spark.
  // Assumes access tokens are stored as environment variables
  // but you can enter them directly below instead.
  io: new Spark({
    token: <%- sparkToken ? '"' + sparkToken + '"': 'process.env.SPARK_TOKEN'; %>,
    deviceId: <%- sparkDeviceID ? '"' + sparkDeviceID + '"': 'process.env.SPARK_DEVICE_ID'; %>
  })
});<% } else if (projectType === "useRasPi") { %>
  var board = new five.Board({
    io: new Raspi()
  });
<% } else { %>
var board = new five.Board();
<% }
if (includeBarcli) { %>
var Barcli = require("barcli");
<% }
if (includej5Songs) { %>
var songs = require("j5-songs");
<% }
if (includeNodePixel) { %>
var pixel = require("node-pixel");
var strip = null;
<% }
if (includeOledJS) { %>
var Oled = require("oled-js");
<% } %>

// The board's pins will not be accessible until
// the board has reported that it is ready
board.on("ready", function () {
  console.log("Ready!");
<% if (includeBarcli) { %>
  // See https://github.com/dtex/barcli for usage
  var graph = new Barcli();
  // Sets bar to 25%
  graph.update(0.25);
  // Sets bar to 100%
  graph.update(1.0);
<% }

if (includeOledJS) { %>
  //OLED Options
  var opts = {
    width: 128,
    height: 64,
    address: 0x3D
  };

  // Instance of Oled
  var oled = new Oled(board, five, opts);

  // See https://github.com/noopkat/oled-js for usage.
  oled.clearDisplay();
<% }

if (includeNodePixel) { %>
  // Node-Pixel options
  strip = new pixel.Strip({
    data: 6,
    length: 4,
    firmata: board,
    controller: "FIRMATA",
  });

  strip.on("ready", function () {
    // do stuff with the strip here.
    // See https://github.com/ajfisher/node-pixel for usage
  });
<% }

if (includej5Songs) { %>
  // j5-songs
  var piezo = new five.Piezo(3);
  // Load a song object
  var song = songs.load("never-gonna-give-you-up");
  // See https://github.com/julianduque/j5-songs for more songs and usage

  // Play it !
  piezo.play(song);
<% }

if (!(includej5Songs || includeOledJS || includeNodePixel)) {

  if (projectType === "useParticle") { %>
  var led = new five.Led("D7");
  <% } else {%>
  var led = new five.Led(13);
  <% } %>
  led.blink(500);<%
} %>
});
