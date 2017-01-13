// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

window.$ = window.jQuery = require('./jquery-3.1.1.min.js')
const {ipcRenderer} = require('electron');

$('#commandInput').focus().select();
$('#commandInput').keyup(function (e) {
  if (e.keyCode == 13) {
    console.log ('enter');
    var rtnMessage = ipcRenderer.sendSync(
      'run-command',
      'C:\\dev\\gsa.ecm.ultra\\src\\GSA.ECM.Ultra.sln'
      // 'ping'
    );
    console.log(rtnMessage);
  }
});
