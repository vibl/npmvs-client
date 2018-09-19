const context = require.context('./', false, /\/[A-Z]\w*\.js$/);

const components = {};

const componentName = str => str.match(/\/(\w+)\./)[1];

context.keys().forEach( file =>
  components[componentName(file)] = context(file).default
);

export default components;