//TODO: rewrite with module 'require-directory';
const context = require.context('./', false, /\/[A-Z]\w*\.js$/);

const components = {};

const getComponentId = str => str.match(/\/(\w+)\./)[1];

context.keys().forEach( file =>  {
  const id = getComponentId(file);
  const module = context(file);
  components[id] = module.default;
});
export default components;
