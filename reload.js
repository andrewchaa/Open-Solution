var find = require('findit');
var path = require('path');

var findEvents = find('c:\\dev');

findEvents.on('directory', function (dir, stat, stop) {
  var base = path.basename(dir);
  if (base === '.git' ||
    base === 'node_modules' ||
    base === 'bin' ||
    base === 'packages'
  ) stop()
//  else console.log(dir + '/')
});

findEvents.on('file', function (file, stat) {
  if (path.extname(file) == '.sln') {
    console.log(file);
  }

});
