const {exec} = require('child_process');

module.exports = (event, params, mainWindow) => {
  console.log(params.cmd + 'ing: ' + params.app);

  if (params.cmd == 'open') {
    exec(params.app, function (error, stdout, stderr) {
      if (error)
        console.log(error);
    })
  }

  if (params.cmd == 'close') {
    mainWindow.hide();
  }

  event.returnValue = params.cmd + 'ed ' + params.app ;
}
