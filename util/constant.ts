import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// constants
const __filename = fileURLToPath(import.meta.url);
export const rootDirName = path.join(dirname(__filename), '..');

export const socketEvents = {
    connect : 'connect',
    sendMessage : 'sendMessage'
}

export const pathParams = {
    roomId : 'roomId'
}

export const paths = {
    CHAT_SCREEN : `/room/:${pathParams.roomId}/chat`,
    CREATE_ROOM : `/room/create`,
    INDEX_SCREEN : `/`
}