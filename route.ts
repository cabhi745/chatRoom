import express from 'express'
import http from 'http'
import path from 'path'
import {Server} from 'socket.io'
import * as controller from './controller'
import { paths, rootDirName } from './util/constant'

const PORT = 3000

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer)


// static routes
app.use(paths.INDEX_SCREEN, express.static(path.join(rootDirName, 'views', 'indexScreen')))

app.use(paths.CHAT_SCREEN, express.static(path.join(rootDirName, 'views', 'chatScreen')))

// socket events 
io.on('connection', controller.onConnection)

httpServer.listen(PORT, () => console.log(`Listening on port ${PORT}`))


