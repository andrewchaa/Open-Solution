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
    {name: 'GSA.ECM.InvestorRelations.sln', action: 'open', target: 'C:\\dev\\gsa.ecm.investorrelations\\src\\GSA.ECM.InvestorRelations.sln'},
    {name: 'GSA.ECM.Hub.sln', action: 'open', target: "C:\\dev\\gsa.ecm.hub\\src\\GSA.ECM.Hub.sln"},
    {name: 'GSA.ECM.Infrastructure.sln', action: 'open', target: "C:\\dev\\gsa.ecm.infrastructure\\src\\GSA.ECM.Infrastructure.sln"},
    {name: 'GSA.ECM.Spark.sln', action: 'open', target: "C:\\dev\\gsa.ecm.spark\\src\\GSA.ECM.Spark.sln"},
    {name: '/config', action: 'config', target: ''}
  ]
});

$('#commandInput').keyup(function (e) {
  if (e.keyCode == ENTER) {
    const command = $(this).typeahead('getActive');
    console.log(command);

    if (command.action == "config") {
      $('#configDialog').collapse();
      return;
    }

    if (command.action == 'open') {
      sendMessage(command);
      return;
    }
  }

  if (e.keyCode == ESC) {
    console.log('closing');
    sendMessage({ action: 'close' });
    return;
  }

});
