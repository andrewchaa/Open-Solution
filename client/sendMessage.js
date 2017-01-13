const {ipcRenderer} = require('electron');

module.exports = (cmd, app) => {
  var rtnMessage = ipcRenderer.sendSync(
    'run-command',
    { cmd: cmd, app: app || '' }
  );

  console.log(rtnMessage);
}
