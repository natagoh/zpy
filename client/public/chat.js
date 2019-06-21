const socket = io();

// adding new players
socket.emit('newPlayer');


// get html elements
var chatText = document.getElementById('chat-text');
var chatInput = document.getElementById('chat-input');
var chatForm = document.getElementById('chat-form');

// whether user is typing or not
var typing;

//add a chat cell to our chat list view, and scroll to the bottom
socket.on('addToChat',function(data) {           
	console.log('got a chat message');
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
	// initially hide chatbar
	chatForm.style.display = "none";
	document.getElementById('chat-input').addEventListener('focus', function() {
		typing = true;
	});
	document.getElementById('chat-input').addEventListener('blur', function() {
		typing = false;
		// todo: hide chat bar
		chatForm.style.display = "none";
	});
});


// document.onkeyup = function(event) {
// 	//user pressed and released enter key
// 	if (event.keyCode === 13) {
// 		if (!typing) {
// 			//user is not already typing, focus our chat text form
// 			chatInput.focus();
// 		} else {
// 			//user sent a message, unfocus our chat form
// 			//chatInput.blur();
// 		}
// 	}
// }

// document.addEventListener('keydown', event => {
//         const key = event.key.toLowerCase();
//         console.log(key);
// });

document.onkeydown = function(event) {
	// t key
	if (event.keyCode === 84) {
		// if user isn;t already typing, show the chat bar
		console.log("special key pressed!");
		if (!typing) {
			console.log("show chat bar");
			// todo: show chat bar and focus
			chatForm.style.display = "block";
			chatInput.focus();
		}
	}
}

