const {app, BrowserWindow} = require('electron') 
const path = require('path')  
const internalIp = require('internal-ip');
(async () => {
	console.log(await internalIp.v4());
})();
const fs = require('fs')
const liveServer = require('live-server')
const params = {
   port: 8181, // Set the server port. Defaults to 8080.
   host: "127.0.0.1", 
   root: __dirname, // Set root directory that's being served. Defaults to cwd.
   open: false, // When false, it won't load your browser by default.
   file: "index.html", // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
   logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
};


let win  

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function createWindow() { 
  const indexhtml = require('./create-indexhtml.js')
  fs.writeFileSync(path.join(__dirname, 'index.html'), indexhtml)
  const ip = internalIp.v4.sync()
  if (ip !== undefined) params.host = ip;
  params.port = getRandomIntInclusive(8001,9000)
  liveServer.start(params)
  const url =  `http://${params.host}:${params.port}`
  win = new BrowserWindow({width: 1280, height: 700, title: url}) 
  win.loadURL(url) 
//  win.webContents.openDevTools()
}  

app.on('ready', createWindow) 
