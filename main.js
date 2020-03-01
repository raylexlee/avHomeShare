const {app, BrowserWindow} = require('electron') 
const url = require('url') 
const path = require('path')  
const fs = require('fs')
const indexhtml = require('./create-indexhtml.js');

let win  

function createWindow() { 
   fs.writeFileSync('index.html', indexhtml)
   win = new BrowserWindow({width: 1280, height: 700}) 
   win.loadURL(url.format ({ 
      pathname: path.join(__dirname, 'index.html'), 
      protocol: 'file:', 
      slashes: true 
   })) 
//   win.webContents.openDevTools()
// "floating" + 1 is higher than all regular windows, but still behind things 
// like spotlight or the screen saver
//   win.setAlwaysOnTop(true, "floating", 1);
// allows the window to show over a fullscreen window
//   win.setVisibleOnAllWorkspaces(true);

}  

app.on('ready', createWindow) 
