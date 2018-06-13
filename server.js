var http = require('http').createServer(handler);
var io = require('socket.io')(http);
import { readFile } from 'fs';

const port = process.env.PORT || 3037;

http.createServer((request, response) => {
	readFile(__dirname + '/public/index.html', function(err, data) {
		if(err) {
			response.writeHead(404, {'Content-Type': 'text/html'});
			return response.end("404 Not Found");
		}

		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write(data);
		return response.end();
	});

	io.sockets.on('connection', function (socket) {
		var lightvalue = 0;
		socket.on('light', function(data) {
			lightvalue = data;
			if (lightvalue) {
				console.log(lightvalue);
			}
		});
	});
}).listen(port);