const electron = require('electron')
const { BrowserWindow, globalShortcut, ipcMain, webContents } = require('electron');
const app = electron.app
const { exec, spawn } = require('child_process');
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 700,
    height: 55,
    alwaysOnTop: true,
    alwaysOnTop: false,
    frame: false,
  });
  // mainWindow.setSize(1000, 600);
  // mainWindow.webContents.openDevTools()

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

  if (message.action == 'open-list') {
    console.log('opening list');
    mainWindow.setSize(700, 500);
    return;
  }

  if (message.action == 'hide-list') {
    console.log('opening list');
    mainWindow.setSize(700, 55);
    return;
  }

  if (message.action == 'focus-main') {
    mainWindow.show();
    mainWindow.webContents.send('client', message);
    return;
  }

  if (message.action == 'open') {
    console.log('opening ' + message.name);
    exec(message.target, function (error, stdout, stderr) {
      if (error) console.log(error);
      mainWindow.hide();
    });
  }

  if (message.action == 'powershell') {
    console.log('opening powershell prompt in ' + message.target);
    exec('start powershell -NoExit -Command cd ' + message.target);
    mainWindow.hide();
  }

  if (message.action == 'explorer') {
    console.log('opening windows explorer in ' + message.target);
    exec('explorer ' + message.target);
    mainWindow.hide();
  }

});
