import {keys} from 'ramda';
const context = require.context('./', false, /\/[A-Z]\w*\.js$/);

const components = {};
export const chartsConfig = {};

const getComponentId = str => str.match(/\/(\w+)\./)[1];

context.keys().forEach( file =>  {
  const id = getComponentId(file);
  const component = context(file);
  components[id] = component.default;
  chartsConfig[id] = component.config;
});
export const chartsList = keys(chartsConfig);
export default components;
