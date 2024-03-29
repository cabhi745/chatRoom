# chatRoom
- A chat room service thats built using node and websockets.
- Uses google OAuth2 for authentication.

## .env setting
- You need to set a couple of env variables before this project can be run locally
- You'll need google Oauth2 app client Id and secret (Ref : https://developers.google.com/identity/sign-in/web/sign-in#create_authorization_credentials)
- Create a .env file in project root and add the following info
```
PORT=Specify the port (default 3000)
CLIENTID=clientId from google OAuth App
SECRET=clientSecret from google OAuth App
```
## Running the project
- Dev : npm run start:dev
- Prod : npm start
- URL : http://localhost:3000

## Infomational content 

### Initializing typescript: 
- npm init : initialize the node package
- npm install typescript  @types/node  --save-dev 
- npx tsc --init --outDir build --esModuleInterop --lib es6 : create tsconfig file, more options check website
- change "module": "ES2020", uncomment "moduleResolution": "node", "noImplicitAny": true
- add type: "module" in package json for es6 imports instead of require

### Transpiling on the fly in dev: 
- npm i nodemon ts-node --save-dev : nodemon to watch for changes, ts-node to complile ts on the fly
- add nodemon.json (needs to be done manually) 

### Compiling and running in prod: 
- npm install rimraf --save-dev : to remove old build 
- "build": "rimraf ./build && tsc" : Add build script in package.json
- added copying of views to dist dir

### Issue with importing directory's index.ts directly
- ES6 modules (type: module in package.json) doesnt allow importing dir directly. Use below work around
- added --experimental-specifier-resolution=node flag to nodemon, specifically to tsnode
- added --experimental-specifier-resolution=node flag to start script, specifically to node


## To-do
- create backend support for rooms -  done
    - connect socket on index and check if room exists - done
    - enhancement: connect socket on index and check if room exist on the same page. based on that redirect to chat screen or show error on same page - P3
- create rooms UI for rooms - done
- Add auth from google - done
- support for auth from google
    - UI for sign in - P1 - DONE
    - add qparams for success and failure in auth and display acc on index - P2
- Using signed in user name and image for chats - P1 - DONE
- auth logout handling - P2
- add logging middleware https://stackoverflow.com/questions/19835652/whats-the-best-practice-for-expressjs-logging - P3