import {processData} from '../process-data';
import {assoc, dissoc} from 'ramda';

const urlRoot = 'http://localhost:3333/package/';
// const urlRoot = 'https://api.npms.io/package/v2/package/';

const urlBuilder = {
  package: (packageName) => urlRoot + encodeURIComponent(packageName),
};

const stateTransformers = {
  adding: (packName, data, extractTree) =>
    ({packages: assoc(packName, processData(packName, 'npms', extractTree, data))}),

  removing: (packName) => ({
    packages: dissoc(packName),
    // charts: map()
  }),
};
export default {
  stateTransformers,
  urlBuilder,
  urlRoot,
};
