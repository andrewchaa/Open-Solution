const {ipcRenderer} = require('electron');

module.exports = (command) => {
  var rtnMessage = ipcRenderer.sendSync('run-command', command);
  console.log(rtnMessage);
}
