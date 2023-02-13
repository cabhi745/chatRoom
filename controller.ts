// package imports
import type { Request, Response } from "express"
import path from 'path'
import { dirname } from 'path';
import { Socket } from "socket.io";
import { fileURLToPath } from 'url';

// file imports 
import * as constant from './util/constant'

// constants
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// screen controllers
export const chatScreen = (req: Request, res: Response) => {
    return res.sendFile(path.join(__dirname, 'views', 'index.html'))
}

// socket handlers
export const onConnection = (socket : Socket) => {
    console.log(`connected with socketId ${socket.id}`)
    socket.on(constant.socketEvents.sendMessage, (data : {message: string}) => {
        socket.broadcast.emit(constant.socketEvents.sendMessage, data)
    })
}