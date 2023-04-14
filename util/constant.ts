import path, { dirname } from 'path';
import { disconnect } from 'process';
import { fileURLToPath } from 'url';

// constants
const __filename = fileURLToPath(import.meta.url);
export const rootDirName = path.join(dirname(__filename), '..');

// route constants
export const pathParams = {
    roomId : 'roomId'
}

export const paths = {
    INDEX_SCREEN : `/`,
    CHAT_SCREEN : `/room/:${pathParams.roomId}/chat`,
    CREATE_ROOM : `/room/create`,
    AUTH : '/auth',
    get AUTH_GOOGLE() {
        return `${this.AUTH}/google`
    },
    get CALLBACK_GOOGLE() {
        return `${this.AUTH}/google/callback`
    },
    get AUTH_FAILURE() {
        return `${this.AUTH_GOOGLE}/failure`
    }

}


// socket io constants
export const socketEvents = {
    connect : 'connect',
    sendMessage : 'sendMessage',
    disconnect: 'disconnect',
    connectRoom: 'connect-room',
    roomDoesNotExist: 'room-does-not-exist'
}

// authentication constants

export const strategyObject = {
    callbackURL : paths.CALLBACK_GOOGLE,
    clientID : process.env.CLIENTID || '',
    clientSecret : process.env.SECRET || ''
}

export const optionsForAuth = {
    scope : ['email', 'profile']
}

// @todo add qparams for success and failure in auth and display acc on index
export const optionsForCallback = {
    failureRedirect : paths.INDEX_SCREEN,
    successRedirect : paths.INDEX_SCREEN,
    session: true
}

export const optionsForSession = {
    name : 'session',
    maxAge: 1000 * 60 * 60 * 24,
    keys: ['secret1', 'secret2']
}