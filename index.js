var express = require("express");
var bodyParser = require("body-parser");
const colyseus = require("colyseus");
const http = require("http");
const WebSocket = require("uws");
const ChatRoom = require("./rooms/01-chat-room")

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

/* var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
}); */

const gameServer = new colyseus.Server({
  engine: WebSocket.Server,
  server: http.createServer(app)
});

gameServer.register("chat", ChatRoom);

gameServer.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});