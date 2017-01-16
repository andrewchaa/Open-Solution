// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

window.$ = window.jQuery = require('./jquery-3.1.1.min.js')
require('./bootstrap/js/bootstrap.min.js');
const sendMessage = require('./sendMessage');

const ENTER = 13;
const ESC = 27

$('#commandInput').focus().select();
$('#commandInput').keyup(function (e) {
  if (e.keyCode == ENTER) {
    const command = $(this).val();
    if (command == "/config") {
      $('#configDialog').modal();
      return;
    }

    sendMessage('open', 'C:\\dev\\gsa.ecm.ultra\\src\\GSA.ECM.Ultra.sln');
    return;
  }

  if (e.keyCode == ESC) {
    sendMessage('close');
    return;
  }

});
