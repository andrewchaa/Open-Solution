const { BrowserWindow, webContents } = require ('electron');
const path = require('path')
const url = require('url')

module.exports = (position) => {
  const popUpWindow = new BrowserWindow({
    x:position[0],
    y:position[1] + 57,
    width: 700,
    height: 300,
    // alwaysOnTop: true,
    frame: false,
    show: false
  });

  popUpWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../client/client-popUp.html'),
    protocol: 'file:',
    slashes: true
  }))

  popUpWindow.setSize(1000, 600);
  popUpWindow.webContents.openDevTools()


  return popUpWindow;
}
