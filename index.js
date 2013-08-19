var fs = require('fs');
var io = require('socket.io').listen(1337, {
	cert: fs.readFileSync('./server.crt'),
	key: fs.readFileSync('./server.key'),
	ca: [fs.readFileSync('./AddTrustExternalCARoot.crt'), fs.readFileSync('./PositiveSSLCA2.crt')]
});

io.enable('browser client etag');
io.set('log level', 1);

io.set('transports', [
	'websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling'
]);

io.set('origins', 'beta.yoursecondphone.co:443');

io.sockets.on('connection', function(socket) {
	socket.on('join', function(room) {
		if (room === undefined) return;

		socket.join(room);
	});

	socket.on('msg', function(data) {
		if (data === undefined) return;
		if (data.room === undefined) return;
		if (data.msg === undefined) return;

		socket.broadcast.to(data.room).emit('msg', data.msg);
	});
});