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


app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static middleware
app.use(express.static(path.join(__dirname, '../client', 'public')));

app.get('/*', (req, res, next) => {
	res.sendFile(path.join(__dirname, '../client', 'index.html'));
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

	socket.on('disconnect', function() {
		console.log('user disconnected');
		delete gameState.players[socket.id]
	});

	// new player joining
	socket.on('newPlayer', () => {
		gameState.players[socket.id] = {
			x: 250, 
			y: 250,
			width: 25,
			height: 25
		}
	})
});

setInterval(() => {
  io.sockets.emit('state', gameState);
}, 1000 / 60);

server.listen(PORT, () => {
	console.log('Server is live on PORT:', PORT);
});

