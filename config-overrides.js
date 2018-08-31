const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const {injectBabelPlugin} = require('react-app-rewired');
const rewireEslint = require('react-app-rewire-eslint');

function overrideEslintOptions(options) {
  // do stuff with the eslint options...
  return options;
}
module.exports = function override (config, env) {
  config = rewireEslint(config, env, overrideEslintOptions);
  config = injectBabelPlugin('babel-plugin-transform-commonjs-es2015-modules',config);
  config = injectBabelPlugin('emotion',config);
  config = rewireReactHotLoader(config, env);
  return config;
};