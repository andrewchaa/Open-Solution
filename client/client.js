window.$ = window.jQuery = require('jquery')
require('bootstrap');
require('bootstrap-3-typeahead');

const { ipcRenderer } = require('electron')
const ENTER = 13;
const ESC = 27

$('#commandInput').focus().select();
$('#commandInput').typeahead({
  source: [
    {name: 'Open GSA.ECM.Ultra.sln', action: 'open', target: 'C:\\dev\\gsa.ecm.ultra\\src\\GSA.ECM.Ultra.sln'},
    {name: 'Open GSA.ECM.InvestorRelations.sln', action: 'open', target: 'C:\\dev\\gsa.ecm.investorrelations\\src\\GSA.ECM.InvestorRelations.sln'},
    {name: 'Open GSA.ECM.Hub.sln', action: 'open', target: "C:\\dev\\gsa.ecm.hub\\src\\GSA.ECM.Hub.sln"},
    {name: 'Open GSA.ECM.Infrastructure.sln', action: 'open', target: "C:\\dev\\gsa.ecm.infrastructure\\src\\GSA.ECM.Infrastructure.sln"},
    {name: 'Open GSA.ECM.Spark.sln', action: 'open', target: "C:\\dev\\gsa.ecm.spark\\src\\GSA.ECM.Spark.sln"},
    {name: 'Open GSA.ECM.FluentData.sln', action: 'open', target: "C:\\dev\\gsa.ecm.fluentdata\\src\\GSA.ECM.FluentData\\GSA.BSG.Libs.FluentData.sln"},
    {name: 'Open GSA.ECM.Cqrs.sln', action: 'open', target: "C:\\dev\\gsa.ecm.Cqrs\\src\\GSA.ECM.Cqrs.sln"},
    {name: 'Open GSA.ECM.Security.sln', action: 'open', target: "C:\\dev\\gsa.ecm.security\\src\\GSA.ECM.Security.sln"},
    {name: 'Open GSA.ECM.MicroserviceHost.sln', action: 'open', target: "C:\\dev\\GSA.ECM.MicroserviceHost\\src\\GSA.ECM.MicroserviceHost.sln"},
    {name: 'Open GSA.ECM.Utils.sln', action: 'open', target: "C:\\dev\\GSA.ECM.Utils\\src\\GSA.ECM.Utils.sln"},
    {name: 'Open GSA.ECM.EmailService.sln', action: 'open', target: "C:\\dev\\GSA.ECM.EmailService\\src\\GSA.ECM.EmailService.sln"},
    {name: 'Open Powershell in GSA.ECM.Ultra', action: 'powershell', target: "C:\\dev\\GSA.ECM.Ultra"},
    {name: 'Open Powershell in GSA.ECM.InvestorRelations', action: 'powershell', target: "C:\\dev\\GSA.ECM.InvestorRelations"},
    {name: 'Open Powershell in GSA.ECM.Hub', action: 'powershell', target: "C:\\dev\\GSA.ECM.Hub"},
    {name: 'Open Powershell in GSA.ECM.Infrastructure', action: 'powershell', target: "C:\\dev\\gsa.ecm.infrastructure"},
    {name: 'Open Powershell in GSA.ECM.Spark', action: 'powershell', target: "C:\\dev\\GSA.ECM.Spark"},
    {name: 'Open Powershell in GSA.ECM.FluentData', action: 'powershell', target: "C:\\dev\\gsa.ecm.fluentdata"},
    {name: 'Open Powershell in GSA.ECM.Cqrs', action: 'powershell', target: "C:\\dev\\gsa.ecm.Cqrs"},
    {name: 'Open Powershell in GSA.ECM.Security', action: 'powershell', target: "C:\\dev\\gsa.ecm.security"},
    {name: 'Open Powershell in GSA.ECM.MicroserviceHost', action: 'powershell', target: "C:\\dev\\GSA.ECM.MicroserviceHost"},
    {name: 'Open Powershell in GSA.ECM.Utils', action: 'powershell', target: "C:\\dev\\GSA.ECM.Utils"},
    {name: 'Open Powershell in GSA.ECM.EmailService', action: 'powershell', target: "C:\\dev\\GSA.ECM.EmailService"},
    {name: 'Open Explorer in GSA.ECM.Ultra', action: 'explorer', target: "C:\\dev\\GSA.ECM.Ultra"},
    {name: 'Open Explorer in GSA.ECM.InvestorRelations', action: 'explorer', target: "C:\\dev\\GSA.ECM.InvestorRelations"},
    {name: 'Open Explorer in GSA.ECM.Hub', action: 'explorer', target: "C:\\dev\\GSA.ECM.Hub"},
    {name: 'Open Explorer in GSA.ECM.Infrastructure', action: 'explorer', target: "C:\\dev\\GSA.ECM.Infrastructure"},
    {name: 'Open Explorer in GSA.ECM.Spark', action: 'explorer', target: "C:\\dev\\GSA.ECM.Spark"},
    {name: 'Open Explorer in GSA.ECM.FluentData', action: 'explorer', target: "C:\\dev\\GSA.ECM.FluentData"},
    {name: 'Open Explorer in GSA.ECM.Cqrs', action: 'explorer', target: "C:\\dev\\GSA.ECM.Cqrs"},
    {name: 'Open Explorer in GSA.ECM.Security', action: 'explorer', target: "C:\\dev\\GSA.ECM.Security"},
    {name: 'Open Explorer in GSA.ECM.MicroserviceHost', action: 'explorer', target: "C:\\dev\\GSA.ECM.MicroserviceHost"},
    {name: 'Open Explorer in GSA.ECM.Utils', action: 'explorer', target: "C:\\dev\\GSA.ECM.Utils"},
    {name: 'Open Explorer in GSA.ECM.EmailService', action: 'explorer', target: "C:\\dev\\GSA.ECM.EmailService"},
    {name: 'Open Explorer in TeamCity package source', action: 'explorer', target: "\\\\intra.gsacapital.com\\live\\deploy\\ecm\\public\\libs"}

  ]
});

$('#commandInput').keyup(function (e) {
  console.log('client: keyCode ' + e.keyCode);

  if (e.keyCode == ENTER) {
    const message = $(this).typeahead('getActive');
    $(this).val(message.name);

    ipcRenderer.send('server', message);
    return;
  }

  if (e.keyCode == ESC) {
    console.log('closing');

    ipcRenderer.send('server', { action: 'hide-window' });
    return;
  }

  console.log('client: display-list ' + $(this).val());
  if ($(this).val().length > 0) {
    var height = $('.typeahead').height() + 60;
    if (height < 60)
      height = 60;

    ipcRenderer.send('window-size', { width: 700, height: height });
  } else {
    ipcRenderer.send('window-size', { width: 700, height: 60 });
  }
});

ipcRenderer.on('focus-main', (event, message) => {
    console.log('focusing #commandInput...');
    $('#commandInput').focus().select();
});
