// package imports
import type { Request, Response } from "express"
import path from 'path'
import { Socket } from "socket.io";

// file imports 
import * as constant from './util/constant'

// screen controllers
export const chatScreen = (req: Request, res: Response) => {
    return res.sendFile(path.join(constant.rootDirName, 'views', 'index.html'))
}

// socket handlers
export const onConnection = (socket : Socket) => {
    console.log(`connected with socketId ${socket.id}`)
    socket.on(constant.socketEvents.sendMessage, (data : {message: string}) => {
        socket.broadcast.emit(constant.socketEvents.sendMessage, data)
    })
}