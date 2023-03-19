import path, { dirname } from 'path';
import { disconnect } from 'process';
import { fileURLToPath } from 'url';

// constants
const __filename = fileURLToPath(import.meta.url);
export const rootDirName = path.join(dirname(__filename), '..');

export const socketEvents = {
    connect : 'connect',
    sendMessage : 'sendMessage',
    disconnect: 'disconnect',
    connectRoom: 'connect-room'
}

export const pathParams = {
    roomId : 'roomId'
}

export const paths = {
    CHAT_SCREEN : `/room/:${pathParams.roomId}/chat`,
    CREATE_ROOM : `/room/create`,
    INDEX_SCREEN : `/`
}