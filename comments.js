// create web server 

// Load the http module to create an http server.
var http = require('http');
var fs = require('fs');
var url = require('url');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  var pathname = url.parse(request.url).pathname;
  console.log("Request for " + pathname + " received.");

  if (pathname === "/") {
    response.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile("index.html", function(err, data) {
      if (err) {
        response.write("Error: " + err);
        response.end();
      } else {
        response.write(data);
        response.end();
      }
    });
  } else if (pathname === "/comments") {
    response.writeHead(200, {"Content-Type": "application/json"});
    fs.readFile("comments.json", function(err, data) {
      if (err) {
        response.write("Error: " + err);
        response.end();
      } else {
        response.write(data);
        response.end();
      }
    });
  } else {
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 Not Found\n");
    response.end();
  }
});

// Listen on port 8000, IP defaults to