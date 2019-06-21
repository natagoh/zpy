const socket = io();

// adding new players
socket.emit('newPlayer');


// get html elements
var chatText = document.getElementById('chat-text');
var chatInput = document.getElementById('chat-input');
var chatForm = document.getElementById('chat-form');

//add a chat cell to our chat list view, and scroll to the bottom
socket.on('addToChat',function(data) {           
	console.log('got a chat message:', data);
 	chatText.innerHTML += '<div class="chatCell">' + data + '</div>';
    chatText.scrollTop = chatText.scrollHeight;
              
});
    

chatForm.onsubmit = function(e) {
	// prevent the form from refreshing the page
 	e.preventDefault();
       
    //call sendMsgToServer socket function, with form text value as argument
    var msg = chatInput.value;
    if (msg.length > 0) {
    	socket.emit('sendMsgToServer', msg);
    	chatInput.value = ""; // reset chat entry 
    }
 }
 
 
document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('chat-input').addEventListener('focus', function() {
		console.log("chat input: ", chatInput.value);
	});
	document.getElementById('chat-input').addEventListener('blur', function() {
		// typing = false;
		// todo: hide chat bar
		chatForm.style.display = "none";
	});
});


document.onkeydown = function(event) {
	event = event || window.event;
	if (chatForm.style.display == "none") {
		// t key
		if (event.keyCode === 84) {
			// if user isn;t already typing, show the chat bart
			// don't let the 't' how up in chat
			event.preventDefault();
			chatForm.style.display = "block";
			chatInput.value = '';
			chatInput.focus();
		}
		// slash key (/) for secret commands ;)))
		else if (event.keyCode === 191) {
			chatForm.style.display = "block";
			chatInput.focus();
		}
	}

	// esc key 
	else if (event.keyCode === 27 && chatForm.style.display != "none") {
		chatForm.style.display = "none";
		// leave focus
		chatInput.blur();
	}
	
}

