const {exec} = require('child_process');
const { BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const storage = require('electron-json-storage');

module.exports = (event, params, mainWindow) => {
  console.log(params.cmd + 'ing: ' + params.app);

  if (params.cmd == 'open') {
    exec(params.app, function (error, stdout, stderr) {
      if (error)
        console.log(error);
    });
  }

  let configWindow;
  if (params.cmd == 'config') {
    // configWindow = new BrowserWindow({width: 1200, height: 600, frame: true})
    configWindow = new BrowserWindow({parent: mainWindow, modal: true})
    // configWindow.webContents.openDevTools()
    // configWindow = new BrowserWindow({width: 400, height: 60, frame: false})

    configWindow.loadURL(url.format({
      pathname: path.join(__dirname, '../client/config.html'),
      protocol: 'file:',
      slashes: true
    }))

    configWindow.on('closed', function () {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      configWindow = null
    })

  }

  if (params.cmd == 'save-config') {
    storage.set('config', params.app);
  }

  if (params.cmd == 'close') {
    mainWindow.hide();
  }



  event.returnValue = params.cmd + 'ed ' + params.app ;
}
