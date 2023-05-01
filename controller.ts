// package imports
import type { Request, Response } from "express"
import path from 'path'
import { Socket } from "socket.io"
import Crypto from 'crypto'
import _ from "lodash"

// file imports 
import * as constant from './util/constant'
import { io } from "./route"

// constants
const socketEvents = constant.socketEvents

// controllers

export const index = (req: Request, res: Response ) => {
    const data = {
        layout: false, // for handlebars to disable layouts
    }
    return res.render(path.join('indexScreen', 'index'), data)
}

export const chat = (req: Request, res: Response ) => {
    const user = _.get(req, 'user')
    const data = {
        image: _.get(user, ['photos', 0, 'value'], null),
        layout: false, // for handlebars to disable layouts
        name: _.get(user, 'displayName', null),
    }
        res.render(path.join('chatScreen', 'index'), data)
}

export const createRoom = (req: Request, res: Response ) => {
    const roomId = Crypto.randomUUID()
    return res.redirect(`/room/${roomId}/chat?create=true`)
}



// socket handler
export const onConnection = (socket : Socket) => {
    let roomId: string
    socket.on(socketEvents.connectRoom, (data: {roomId: string, create: boolean}) => {
        // check if room exists
        console.log(`Creating new room: ${data.create}`)
        if (!data.create && !io.sockets.adapter.rooms.get(data.roomId)) {
            console.log(`Room does not exisit with roomId ${data.roomId}`)
            // @todo send a room doesnt exist event to connection.
            io.to(socket.id).emit(socketEvents.roomDoesNotExist)
            socket.disconnect()
            return
        }
        console.log(`connected with socketId ${socket.id} and roomId ${data.roomId}`)
        roomId = data.roomId
        socket.join(data.roomId)
        // console.log(io.sockets.adapter.rooms)
    })
    socket.on(socketEvents.sendMessage, (data : {message: string}) => {
        socket.to(roomId).emit(socketEvents.sendMessage, data)
    })

    socket.on(socketEvents.disconnect, (reason : string) => {
        console.log(`SocketId ${socket.id} disconnected : ${reason}` )
        socket.leave(roomId)
    })
}
