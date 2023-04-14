import express from 'express'
import http from 'http'
import path from 'path'
import {Server} from 'socket.io'
import 'dotenv/config'
import passport from 'passport'
import { Strategy } from 'passport-google-oauth20'

// module imports
import * as controller from './controller'
import * as middleware from './util/middleware'
import { optionsForAuth, optionsForCallback, optionsForSession, paths, rootDirName, strategyObject,  } from './util/constant'
import { verifyCallback } from './util/middleware'
import cookieSession from 'cookie-session'

// constants
const PORT = process.env.PORT || 3000
const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer)

// authentication middlewares

passport.serializeUser(middleware.serializeMiddleware)
passport.deserializeUser(middleware.deserializeMiddleware)
app.use(cookieSession(optionsForSession))

passport.use(new Strategy(strategyObject, verifyCallback))
app.use(passport.initialize())
app.use(passport.session()) // let passport know to use sessions

app.get(paths.AUTH_GOOGLE, passport.authenticate('google', optionsForAuth ))
app.get(paths.CALLBACK_GOOGLE, passport.authenticate('google', optionsForCallback))

// routes
app.use(paths.INDEX_SCREEN, express.static(path.join(rootDirName, 'views', 'indexScreen')))

//check log in for all the below routes
app.use(middleware.isLoggedIn)

app.use(paths.CHAT_SCREEN, express.static(path.join(rootDirName, 'views', 'chatScreen')))

app.get(paths.CREATE_ROOM, controller.createRoom)


// socket events 
io.on('connection', controller.onConnection)

httpServer.listen(PORT, () => console.log(`Listening on port ${PORT}`))

export {io}
