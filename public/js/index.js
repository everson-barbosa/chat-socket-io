

const loginButton = document.querySelector('[data-js="login"]')
const selectRoomDiv = document.querySelector('[data-js="select_room"]')
const usernameText = document.querySelector('[data-js="username"]')
const alertDiv = document.querySelector('[data-js="alert"]')


// Adicionando evento nos selecionadores de sala
selectRoomDiv.querySelectorAll('.item').forEach((item) => {
        item.addEventListener('click', (e) => {
            selectRoomDiv.querySelectorAll('.item')
                .forEach((item) => {
                    item.classList.remove('active')
                })
            e.target.closest('.item').classList.add('active')
        })
    })

// Adicionado evento no botão Entrar
loginButton.addEventListener('click', (e) => {
    redirectToRoom()
})

// Adicionando evento de Enter no input do usuário
usernameText.addEventListener('keypress', (e) => {
    if(e.key == "Enter") {
        redirectToRoom()
    } 
})

const formValidate = () => {
    if(!selectRoomDiv.querySelector('.active')) {
        return {
            error: 'Nenhuma sala selecionada'
        }
    }
    const room = selectRoomDiv.querySelector('.active span').innerText
    const username =  usernameText.value.replaceAll(" ","")

    if(username == "") {
        return {
            error: 'Informe seu usuário para ser reconhecido na sala'
        }
    }
    return {
        username,
        room
    }
}

const showAlert = (text) => {
    alertDiv.innerHTML = `
        <span>${text}</span>
        <span class="dismiss">x</span>
    `
    alertDiv.style.display = "flex"
}

const redirectToRoom = () => {
    const validate = formValidate()

    if(validate.error) {
        showAlert(validate.error)
    }

    if(validate.username && validate.room) {
        window.location.href = `
            chat.html?select_room=${validate.room}&username=${validate.username}
        `
    }
}