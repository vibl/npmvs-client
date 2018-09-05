// const context = require.context('./', false, /\/(?!index).+\.js$/);
const context = require.context('./', false, /.+\.js$/);

const modules = {};

const moduleName = str => str.match(/\/(\w+)\./)[1];

context.keys().forEach( file =>
  file !== './index.js' ? modules[moduleName(file)] = context(file).default : null
);


export default modules;