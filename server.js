const electron = require('electron')
const { BrowserWindow, globalShortcut, ipcMain, webContents } = require('electron');
const app = electron.app
const { exec, spawn } = require('child_process');
const path = require('path')
const url = require('url')

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 700,
    height: 55,
    alwaysOnTop: true,
    frame: false,
  });
  // mainWindow.setSize(1000, 600);
  // mainWindow.webContents.openDevTools()

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './client/client.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.on('closed', function () { mainWindow = null })
}

app.on('ready', () => {
  createWindow();

  globalShortcut.register('CommandOrControl+Space', () => {
    console.log('showing the window...')
    mainWindow.show();
    mainWindow.webContents.send('focus-main');
  })
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') { app.quit() }
})

app.on('activate', function () {
  if (mainWindow === null) { createWindow() }
})

ipcMain.on('window-size', function (event, message) {
  console.log('window-size: ' + JSON.stringify(message));
  mainWindow.setSize(message.width, message.height);
});

ipcMain.on('server', function (event, message) {
  console.log('main: ipcMain - ' + JSON.stringify(message));

  if (message.action == 'open') {
    console.log('opening ' + message.name);
    exec(message.target, function (error, stdout, stderr) {
      if (error) console.log(error);
      mainWindow.setSize(700, 55);
      mainWindow.hide();
    });
  }

  if (message.action == 'powershell') {
    console.log('opening powershell prompt in ' + message.target);
    exec('start powershell -NoExit -Command cd ' + message.target);
    mainWindow.setSize(700, 55);
    mainWindow.hide();
  }

  if (message.action == 'explorer') {
    console.log('opening windows explorer in ' + message.target);
    exec('explorer ' + message.target);
    mainWindow.setSize(700, 55);
    mainWindow.hide();
  }

  if (message.action == 'hide-window') {
    console.log('hiding window ...')
    mainWindow.setSize(700, 55);
    mainWindow.hide();
  }

});
