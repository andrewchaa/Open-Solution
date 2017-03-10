const electron = require('electron')
const { BrowserWindow, globalShortcut, ipcMain, webContents } = require('electron');
const app = electron.app
const handleMessage = require('./server/handleMessage');

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
    // alwaysOnTop: true,
    alwaysOnTop: false,
    frame: false,
  });
  // mainWindow.setSize(1000, 600);
  // mainWindow.webContents.openDevTools()

  const position = mainWindow.getPosition();

  popUpWindow = new BrowserWindow({
    x:position[0],
    y:position[1] + 60,
    width: 700,
    height: 300,
    // alwaysOnTop: true,
    alwaysOnTop: false,
    frame: false,
  });

  console.log(mainWindow);

  console.log(mainWindow.getPosition());

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './client/index.html'),
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

ipcMain.on('run-command', function (event, command) {
  return handleMessage(event, command, mainWindow);
});
