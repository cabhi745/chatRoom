# chatRoom
a chat room service using node and websockets

## Initializing typescript: 
- npm init : initialize the node package
- npm install typescript  @types/node  --save-dev 
- npx tsc --init --outDir build --esModuleInterop --lib es6 : create tsconfig file, more options check website
- change "module": "ES2020", uncomment "moduleResolution": "node", "noImplicitAny": true
- add type: "module" in package json for es6 imports instead of require

## Transpiling on the fly in dev: 
- npm i nodemon ts-node --save-dev : nodemon to watch for changes, ts-node to complile ts on the fly
- add nodemon.json (needs to be done manually) 

## Compiling and running in prod: 
- npm install rimraf --save-dev : to remove old build 
- "build": "rimraf ./build && tsc" : Add build script in package.json

## Issue with importing directory's index.ts directly
- ES6 modules (type: module in package.json) doesnt allow importing dir directly. Use below work around
- added --experimental-specifier-resolution=node flag to nodemon, specifically to tsnode
- added --experimental-specifier-resolution=node flag to start script, specifically to node

## Running the project
- Dev : npm run start:dev
- Prod : npm start

## todo
- create backend support for rooms -  done
    - connect socket on index and check if room exists
- create UI for rooms - done
- Add auth from google
- support for auth from google
- add logging middleware https://stackoverflow.com/questions/19835652/whats-the-best-practice-for-expressjs-logging