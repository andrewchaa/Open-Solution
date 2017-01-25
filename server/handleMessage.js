const {exec} = require('child_process');
const { BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const storage = require('electron-json-storage');

module.exports = (event, command, mainWindow) => {
  if (command.action == 'open') {
    console.log('opening ' + command.name);
    exec(command.target, function (error, stdout, stderr) {
      if (error) console.log(error);

      mainWindow.hide();
    });
  }

  if (command.action == 'save-config') {
    storage.set('config', command.target);
  }

  if (command.action == 'close') {
    mainWindow.hide();
  }

  event.returnValue = command.action + 'ed ' + command.target ;
}
