const {exec} = require('child_process');

module.exports = (event, arg) => {
  console.log('Opening ' + arg);

  exec(arg, function (error, stdout, stderr) {
    if (error)
      console.log(error);
  })

  event.returnValue = 'Opened ' + arg;

}
