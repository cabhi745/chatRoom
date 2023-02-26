import express from 'express'
import http from 'http'
import path from 'path'
import {Server} from 'socket.io'
import * as controller from './controller'
import { rootDirName } from './util/constant'

const PORT = 3000

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer)

// express routes
app.use(express.static(path.join(rootDirName, 'views')))

// socket events 
io.on('connection', controller.onConnection)

httpServer.listen(PORT, () => console.log(`Listening on port ${PORT}`))


