const util = require('util');

module.exports = (obj) => util.inspect(obj).replace(/\[Function: (\w+)\]/g, '$1');
