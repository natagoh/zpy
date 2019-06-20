const socket = io();

// adding new players
socket.emit('newPlayer');


// get html elements
var chatText = document.getElementById('chat-text');
var chatInput = document.getElementById('chat-input');
var chatForm = document.getElementById('chat-form');


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
    socket.emit('sendMsgToServer', chatInput.value);
    chatInput.value = "";   
 }
 
 
document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('chat-input').addEventListener('focus', function() {
		typing = true;
	});
	document.getElementById('chat-input').addEventListener('blur', function() {
		typing = false;
	});
});


document.onkeyup = function(event) {
	//user pressed and released enter key
	if (event.keyCode === 13) {
		if (!typing) {
			//user is not already typing, focus our chat text form
			chatInput.focus();
		}
		else {
			//user sent a message, unfocus our chat form
			chatInput.blur();
		}
	}
}


