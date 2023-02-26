const socket = io()

const sendButton = document.getElementById("sendBtn")
const messageText = document.getElementById("messageText")
const chatContainer = document.getElementById("chatContainer")

sendButton.addEventListener('click', sendMessage)

function addMessageToChat(message) {
    chatContainer.innerHTML = chatContainer.innerHTML += message + "<br>"
}
function sendMessage() {
    const message = messageText.value
    addMessageToChat(message)
    messageText.value = ''

    // send message to the server 
    socket.emit('sendMessage', {message})
}

// reciever msg from server
socket.on('sendMessage', (data) => addMessageToChat(data.message))