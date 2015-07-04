var five = require("johnny-five");
<% if ( useParticle ) { %>var board = new five.Board({
  io: new Spark({
    token: process.env.SPARK_TOKEN,
    deviceId: process.env.SPARK_DEVICE_ID
  });
});<% } else if ( useRasPi ) { %>var board = new five.Board({
  io: new Raspi()
});<% } else { %>var board = new five.Board();<% } %>

<% if ( includeBarcli ) { %>var Barcli = require("barcli");<% } %>
<% if ( includej5Songs ){ %>var songs = require("j5-songs");<% } %>
<% if ( includeNodePixel ){ %>var pixel = require("node-pixel");<% } %>
<% if ( includeOledJS ) { %>var Oled = require("oled-js");<% } %>
<% if ( includeNodePixel ){ %>var strip = null;<% } %>

// The board's pins will not be accessible until
// the board has reported that it is ready
board.on("ready", function() {
  console.log("Ready!");
  <% if ( includeBarcli ) { %>var graph = new Barcli();

  graph.update(0.25); // Sets bar to 25%
  graph.update(1.0); // Sets bar to 100%<% } %>
  <% if ( includeOledJS ) { %>var opts = {
    width: 128,
    height: 64,
    address: 0x3D
  };

  var oled = new Oled(board, five, opts);<% } %>
  <% if ( includeNodePixel ){ %>strip = new pixel.Strip({
        data: 6,
        length: 4,
        firmata: board,
        controller: "FIRMATA",
    });

    strip.on("ready", function() {
        // do stuff with the strip here.
    });<% } %>
  <% if ( includej5Songs ) { %>var piezo = new five.Piezo(3);
  // Load a song object
  var song = songs.load('never-gonna-give-you-up');

  // Play it !
  piezo.play(song);

  // List all songs
  songs.list(function (err, tunes) {
  // Object literal with all the songs
  });<% } %>
  <% if ( !(includej5Songs || includeOledJS || includeNodePixel)) { %>var led = new five.Led(13);
  led.blink(500);<% } %>
});
