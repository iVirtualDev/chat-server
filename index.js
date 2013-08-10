var io = require('socket.io').listen(9000);

io.sockets.on('connection', function(socket){
	socket.on('join', function(room){
		if(room === undefined) return;

		socket.join(room);
	});

	socket.on('msg', function(data){
		if(data === undefined) return;
		if(data.room === undefined) return;
		if(data.msg === undefined) return; 

		socket.broadcast.to(data.room).emit('msg', data.msg);
	});
});