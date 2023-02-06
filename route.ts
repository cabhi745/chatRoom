import express from 'express'
import http from 'http'
import path from 'path'
import {Server} from 'socket.io'
import { dirname } from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 3000

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer)

// express routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
} )

// socket events 
io.on('connection', (socket) => {
    console.log(socket.id)
})

httpServer.listen(PORT, () => console.log(`Listening on port ${PORT}`))




