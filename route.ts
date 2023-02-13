import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import * as controller from './controller'

const PORT = 3000

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer)

// express routes
app.get('/', controller.chatScreen) 

// socket events 
io.on('connection', controller.onConnection)

httpServer.listen(PORT, () => console.log(`Listening on port ${PORT}`))




