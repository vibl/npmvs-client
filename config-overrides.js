const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const {injectBabelPlugin} = require('react-app-rewired');
const rewireEslint = require('react-app-rewire-eslint');
const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveModulePath = relativePath => path.resolve(appDirectory, 'node_modules/' + relativePath);

function overrideEslintOptions(options) {
  // do stuff with the eslint options...
  return options;
}
const includeModules = [
  'mem',
  'p-map',
  'map-age-cleaner',
  'p-defer',
  'p-is-promise',
  'mimic-fn',
];
const modulePaths = includeModules.map(resolveModulePath);

module.exports = function override (config, env) {
  config = rewireEslint(config, env, overrideEslintOptions);
  config = injectBabelPlugin('babel-plugin-transform-commonjs-es2015-modules',config);
  config = injectBabelPlugin('emotion',config);
  config = rewireReactHotLoader(config, env);
  config.module.rules[1].oneOf[1].include = [
    config.module.rules[1].oneOf[1].include,
    ...modulePaths,
  ];
  return config;
};