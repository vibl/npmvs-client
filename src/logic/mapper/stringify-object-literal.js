const util = require('util');

module.exports = (obj) => util.inspect(obj)
  .replace(/:\n( +)\{/gm, ': {\n$1 ')
  .replace(/ },?\n( *)/gm, ',\n$1},\n$1')
  .replace(/^\{([\s\S]+)\}$/m, '{\n $1\n}')
  .replace(/ } *\n}$/m, ',\n  },\n}')
  // .replace(/\[Function: (\w+)\]/g, '$1')

  // .replace(/:\n( +)\{/, ': {\n$1')
  //
;
