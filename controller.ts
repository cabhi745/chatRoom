// package imports
import type { Request, Response } from "express"
import path from 'path'
import { Socket } from "socket.io";
import Crypto from 'crypto'

// file imports 
import * as constant from './util/constant'


// controllers


export const createRoom = (req: Request, res: Response ) => {
    const roomId = Crypto.randomUUID()
    return res.redirect(`/room/${roomId}/chat`)
}

// export const chatScreen = (req: Request, res: Response ) => {
//     res.render()
// }

// socket handlers
export const onConnection = (socket : Socket) => {
    let roomId: string
    console.log(`connected with socketId ${socket.id}`)
    socket.on(constant.socketEvents.connectRoom, (data: {roomId: string}) => {
        console.log(`connected with socketId ${socket.id} and roomId ${data.roomId}`)
        roomId = data.roomId
        socket.join(data.roomId)
    })
    socket.on(constant.socketEvents.sendMessage, (data : {message: string}) => {
        socket.to(roomId).emit(constant.socketEvents.sendMessage, data)
    })

    socket.on(constant.socketEvents.disconnect, (reason : string) => {
        console.log(`SocketId ${socket.id} disconnected : ${reason}` )
        socket.leave(roomId)
    })
}
