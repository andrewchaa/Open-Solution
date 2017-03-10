window.$ = window.jQuery = require('jquery')

const { ipcRenderer } = require('electron')
require('bootstrap');
require('bootstrap-3-typeahead');

const ENTER = 13;
const ESC = 27

$('#input').typeahead({
  source: [
    {name: 'Open GSA.ECM.Ultra.sln', action: 'open', target: 'C:\\dev\\gsa.ecm.ultra\\src\\GSA.ECM.Ultra.sln'},
    {name: 'Open GSA.ECM.InvestorRelations.sln', action: 'open', target: 'C:\\dev\\gsa.ecm.investorrelations\\src\\GSA.ECM.InvestorRelations.sln'},
    {name: 'Open GSA.ECM.Hub.sln', action: 'open', target: "C:\\dev\\gsa.ecm.hub\\src\\GSA.ECM.Hub.sln"},
    {name: 'Open GSA.ECM.Infrastructure.sln', action: 'open', target: "C:\\dev\\gsa.ecm.infrastructure\\src\\GSA.ECM.Infrastructure.sln"},
    {name: 'Open GSA.ECM.Spark.sln', action: 'open', target: "C:\\dev\\gsa.ecm.spark\\src\\GSA.ECM.Spark.sln"},
    {name: 'Open GSA.ECM.FluentData.sln', action: 'open', target: "C:\\dev\\gsa.ecm.fluentdata\\src\\GSA.ECM.FluentData\\GSA.BSG.Libs.FluentData.sln"},
    {name: 'Open Powershell in GSA.ECM.Ultra', action: 'powershell', target: "C:\\dev\\GSA.ECM.Ultra"},
    {name: 'Open Powershell in GSA.ECM.InvestorRelations', action: 'powershell', target: "C:\\dev\\GSA.ECM.InvestorRelations"},
    {name: 'Open Powershell in GSA.ECM.Hub', action: 'powershell', target: "C:\\dev\\GSA.ECM.Hub"},
    {name: 'Open Powershell in GSA.ECM.Infrastructure', action: 'powershell', target: "C:\\dev\\gsa.ecm.infrastructure"},
    {name: 'Open Powershell in GSA.ECM.Spark', action: 'powershell', target: "C:\\dev\\GSA.ECM.Spark"},
    {name: 'Open Powershell in GSA.ECM.FluentData', action: 'powershell', target: "C:\\dev\\gsa.ecm.fluentdata"},
    {name: 'Open Explorer in TeamCity package source', action: 'explorer', target: "\\\\intra.gsacapital.com\\live\\deploy\\ecm\\public\\libs"},
    {name: 'Open Explorer in GSA.ECM.Ultra', action: 'explorer', target: "C:\\dev\\GSA.ECM.Ultra"},
    {name: 'Open Explorer in GSA.ECM.InvestorRelations', action: 'explorer', target: "C:\\dev\\GSA.ECM.InvestorRelations"},
    {name: 'Open Explorer in GSA.ECM.Hub', action: 'explorer', target: "C:\\dev\\GSA.ECM.Hub"},
    {name: 'Open Explorer in GSA.ECM.Infrastructure', action: 'explorer', target: "C:\\dev\\GSA.ECM.Infrastructure"},
    {name: 'Open Explorer in GSA.ECM.Spark', action: 'explorer', target: "C:\\dev\\GSA.ECM.Spark"},
    {name: 'Open Explorer in GSA.ECM.FluentData', action: 'explorer', target: "C:\\dev\\GSA.ECM.FluentData"},
    {name: '/config', action: 'config', target: ''}
  ]
});

ipcRenderer.on('client', (event, message) => {
  console.log('clientPopUp: ipcRenderer - ' + JSON.stringify(message));
  $('#input').val(message.value);
  $('#input').typeahead('lookup');

  ipcRenderer.send('server', { action: 'focus-main'});
});
