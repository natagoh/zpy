const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

// game state
const gameState = {
  players: {}
}

SOCKET_LIST = {};

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static middleware
app.use(express.static(path.join(__dirname, '../dist', '')));

// app.get('/*', (req, res, next) => {
// 	res.sendFile(path.join(__dirname, '../public', 'index.html'));
// });

app.get('/*', (req, res, next) => {
	res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.send(err.message || 'Internal server error');
});

io.on('connection', (socket) => {
	console.log('a user connected:', socket.id);
	SOCKET_LIST[socket.id] = socket;

	socket.on('disconnect', function() {
		console.log('user disconnected');
		delete SOCKET_LIST[socket.id];
		// delete gameState.players[socket.id]
	});

	// new player joining
	socket.on('newPlayer', () => {
		console.log('a PLAYER connected:', socket.id);
		gameState.players[socket.id] = {
			name: "player" + socket.id
		}
	})

	// send chat message to server
    socket.on('sendMsgToServer', function(text) {
        console.log('someone sent a message!');
        // send to all sockets
        io.sockets.emit('addToChat', {msg: text, name: "player-" + String(socket.id).substring(0, 4)});
        // for (var i in SOCKET_LIST) {
        // 	// todo: username for
        // 	SOCKET_LIST[i].emit('addToChat', {msg: text, name: "player-" + String(socket.id).substring(0, 4)});
        // }
    });

    //todo: player changes name
});

setInterval(() => {
  io.sockets.emit('state', gameState);
}, 1000 / 60);

server.listen(PORT, () => {
	console.log('Server is live on PORT:', PORT);
});

