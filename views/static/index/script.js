const joinForm = get('#join-room-form')
const createButton = get('.create-room-btn')
const joinTitle = get('#join-title')
const loginTitle = get('#login-title')
const loginButton = get('.google-btn')

if(!isLoggedIn) {
    joinTitle.style.display = 'none'
    joinForm.style.display = 'none'
} else {
    loginTitle.style.display = 'none'
    loginButton.style.display = 'none'
}

joinForm.addEventListener('submit', joinRoom)
createButton.addEventListener('click', createRoom)

function joinRoom (event) {
    event.preventDefault()
    const inputRoomId = get('.room-id-input').value
    redirect(`/room/${inputRoomId}/chat`)
}
function createRoom(event) {
    redirect(`/room/create`) 
}

// util

function redirect(url, method = 'relative') {
    if(method === 'relative') location.href = url
}
function get(identifier, root = document) {
    return root.querySelector(identifier)
}