// const context = require.context('./', false, /\/(?!index).+\.js$/);
const context = require.context('./', false, /\/source_[^/]+\.js$/);

const modules = {};

const moduleName = str => str.match(/\/([^.]+)\./)[1];

context.keys().forEach( file =>
  file !== './index.js' ? modules[moduleName(file)] = context(file).default : null
);

export const fetchFromSource = (sourceName, packId) => modules[`source_${sourceName}`](packId);

export default modules;