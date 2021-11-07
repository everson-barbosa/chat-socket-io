import { io } from './http'

interface Message {
    room: string,
    text: string,
    createdAt: Date,
    username: string
}

interface RoomUser {
    socket_id: string,
    username: string,
    room: string
}

const users: RoomUser[] = []

const messages: Message[] = []

io.on("connection", (socket) => {
    socket.on("select_room", (data, callback) => {
        socket.join(data.room)
        const userInRoom = users.find(user => user.username === data.username && user.room === data.room)
        if(userInRoom) {
            userInRoom.socket_id = socket.id
        } 
        else {
            users.push({
                username: data.username,
                room: data.room,
                socket_id: socket.id
            })
        }

        const messagesRoom = getMessagesRoom(data.room)
        callback(messagesRoom)
    })
    socket.on("message", (data) => {
        const message: Message = {
            room: data.room,
            text: data.message,
            username: data.username,
            createdAt: new Date()
        }

        messages.push(message)

        io.to(data.room).emit('message', message)
    })
    socket.on("disconnect", () => {
        console.log(messages)
    })
})


const getMessagesRoom = (room: string) =>
    messages
        .filter((message) => 
            message.room === room)