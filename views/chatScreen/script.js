const socket = io()
const BOT_NAME = "Jenna";
const PERSON_NAME = "Abhi";
const BOT_IMG = "https://picsum.photos/500/500";
const PERSON_IMG = "https://picsum.photos/500/500";
const roomId = getRoomId()


// emit event to send roomId
socket.emit('connect-room', {roomId, create: isCreateRoom()})

const msgerForm = get(".msger-inputarea")
const msgerInput = get(".msger-input")
const msgerChat = get(".msger-chat")

msgerForm.addEventListener('submit', sendMessage)

function addMessageToChat(name, img, side, text) {
    const msgHTML =  `
      <div class="msg ${side}-msg">
        <div class="msg-img" style="background-image: url(${img})"></div>
  
        <div class="msg-bubble">
          <div class="msg-info">
            <div class="msg-info-name">${name}</div>
            <div class="msg-info-time">${formatDate(new Date())}</div>
          </div>
  
          <div class="msg-text">${text}</div>
        </div>
      </div>
    `;
  
    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 500;
}

function sendMessage(event) {
    event.preventDefault()
    const message = msgerInput.value
    if (!message) return;
    addMessageToChat(PERSON_NAME, PERSON_IMG, 'right',  message)
    msgerInput.value = ''
    // send message to the server 
    // get roomId from a templating engine later on
    socket.emit('sendMessage', {message})
}

// reciever msg from server
socket.on('sendMessage', (data) => addMessageToChat(BOT_NAME, BOT_IMG, 'left',  data.message))


// Utils
function isCreateRoom() {
  const params = getParams()
  return params?.create === 'true' ? true : false
}

// ref : https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParams() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  })
  return params
}

function getRoomId() {
  const urlList = window.location.href.split('/')
  const indexOfRoomId = urlList.indexOf('room') + 1
  return urlList[indexOfRoomId]
}

function get(selector, root = document) {
    return root.querySelector(selector);
}

function formatDate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();
    return `${h.slice(-2)}:${m.slice(-2)}`;
}