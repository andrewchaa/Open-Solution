const electron = require('electron')
const { BrowserWindow, globalShortcut, ipcMain, webContents } = require('electron');
const app = electron.app
const handleMessage = require('./server/handleMessage');
const popUp = require('./server/popUp');

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let popUpWindow;

function createWindow () {
  // mainWindow = new BrowserWindow({transparent: true, width: 1024, height: 600, frame: true})
  // mainWindow = new BrowserWindow({transparent: true, width: 600, height: 400, frame: false})
  mainWindow = new BrowserWindow({
    width: 700,
    height: 55,
    alwaysOnTop: true,
    alwaysOnTop: false,
    frame: false,
  });
  // mainWindow.setSize(1000, 600);
  // mainWindow.webContents.openDevTools()

  popUpWindow = popUp(mainWindow.getPosition());

  console.log(mainWindow.getPosition());

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './client/client-main.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.on('closed', function () { mainWindow = null })
}

app.on('ready', () => {
  createWindow();
  globalShortcut.register('CommandOrControl+Space', () => {
    mainWindow.show();
    mainWindow.webContents.send('show-window', 'hello');
  })
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') { app.quit() }
})

app.on('activate', function () {
  if (mainWindow === null) { createWindow() }
})

ipcMain.on('server', function (event, message) {
  console.log('main: ipcMain - ' + JSON.stringify(message));

  if (message.action == 'display-list') {
    console.log('displaying list');
    mainWindow.setSize(700, 600);
  }

  if (message.action == 'key up') {
    popUpWindow.show();
    popUpWindow.webContents.send('client', message);
  }

  if (message.action == 'focus-main') {
    mainWindow.show();
    mainWindow.webContents.send('client', message);
  }
  // event.sender.send('client', message);
});

// ipcMain.on('run-command', function (event, command) {
//   return handleMessage(event, command, mainWindow, popUpWindow);
// });
//
// ipcMain.on('client-messages', function (event, message) {
//   console.log('client-messages: ' + message);
//   if (message == 'focus-main') {
//     mainWindow.webContents.send('main-client', message);
//   }
// })
