const socket = io()

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get('username');
const room = urlSearch.get('select_room');

const usernameDiv = document.querySelector('[data-js="username"')
usernameDiv.innerHTML = `Bem-vindo <b>${username}</b>! Você está na sala sobre <b>${room}</b>`

socket.emit('select_room', {
    username,
    room
}, 
    (messages) => {
        messages.forEach(message => 
            createMessage(message)
        )
})

document
    .querySelector('[data-js="message_input"] button')
    .addEventListener('click', (e) => {
            const textarea = document.querySelector('[data-js="message_input"] textarea')
            if(textarea.value != "") {
                const message = textarea.value

                const data = {
                    room,
                    username,
                    message
                }
                socket.emit('message', data)
                textarea.value = ""
            }
        
})

socket.on("message", (data) => {
    createMessage(data)
})

socket.on("disconnect", () => {
    console.log("Deslogou")
})

const createMessage = (data) => {
    const messageDiv = document.querySelector('[data-js="messages"]')

    messageDiv.innerHTML += `
    <div class="message">
        <img src="imgs/avatar_default.png" class="avatar">
        <div class="message_content">
            <div>
                <span class="username"> ${data.username} </span> 
                <span class="date">${formattedDate(data.createdAt)} </span>
            </div>
            <div>
                <span> ${data.text} </span>
            </div>
        </div>
    </div>
    `

    messageDiv.scroll(0, messageDiv.scrollHeight)

}

document.querySelector('[data-js="logout"]').addEventListener('click', e =>
     window.location.href = "index.html"
)

const formattedDate = (date) => {
    dt = new Date(date)
    return `
    ${dt.getHours() > 10 ? dt.getHours() : '0' + dt.getHours()}:
    ${dt.getMinutes() > 10 ? dt.getMinutes() : '0' + dt.getMinutes()}
    `
}
