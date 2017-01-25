window.$ = window.jQuery = require('jquery')
require('bootstrap');
require('bootstrap-3-typeahead');
const sendMessage = require('./sendMessage');

const ENTER = 13;
const ESC = 27

$('#commandInput').focus().select();
$('#commandInput').typeahead({
  source: [
    {name: 'GSA.ECM.Ultra.sln', action: 'open', target: 'C:\\dev\\gsa.ecm.ultra\\src\\GSA.ECM.Ultra.sln'},
    {name: 'GSA.ECM.InvestorRelations.sln', action: 'open', target: 'C:\\dev\\gsa.ecm.investorrelations\src\GSA.ECM.InvestorRelations.sln'}
  ]
});

$('#commandInput').keyup(function (e) {
  if (e.keyCode == ENTER) {
    const command = $(this).val();
    if (command == "/config") {
      $('#configDialog').collapse();

      // sendMessage('config');
      return;
    }

    console.log($(this).val());
    // sendMessage('open', 'C:\\dev\\gsa.ecm.ultra\\src\\GSA.ECM.Ultra.sln');
    return;
  }

  if (e.keyCode == ESC) {
    sendMessage('close');
    return;
  }

});
