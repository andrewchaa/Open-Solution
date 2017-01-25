window.$ = window.jQuery = require('jquery')
require('./bootstrap/js/bootstrap.min.js');
require('bootstrap-3-typeahead');
const sendMessage = require('./sendMessage');

const ENTER = 13;
const ESC = 27

$('#commandInput').focus().select();
$('#commandInput').keyup(function (e) {
  if (e.keyCode == ENTER) {
    const command = $(this).val();
    if (command == "/config") {
      $('#configDialog').collapse();

      // sendMessage('config');
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

$('#commandInput').typeahead({
  source: ['GSA.ECM.Ultra.sln']
});
