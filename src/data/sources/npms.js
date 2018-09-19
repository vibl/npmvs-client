import http from "../../logic/http";
import store from "../../logic/store";

const enpointUrl = 'https://api.npms.io/v2/package/';
const params = '';
// const enpointUrl = 'http://localhost:3333/package/';
const dataPoints = {
  collected: {
    metadata: {
      name: 1,
        version: 1,
        description: 1,
        keywords: 1,
        author: 1,
        publisher: 1,
        maintainers: 1,
        repository: 1,
        links: {
        npm: 2,
          homepage: 2,
          repository: 2,
          bugs: 2,
      },
      license: 1,
        dependencies: 1,
        releases: 1,
        readme: 1,
    },
    github: {
      homepage: 2,
        forksCount: 1,
        subscribersCount: 1,
        issues: {
          count: 2,
          openCount: 2,
          distribution: 2,

        },
        contributors: 1,
        commits: 1,
    },
  },
};

const idFromPath = (level, path) => {
  const nameSegments = path.slice(path.length - level, path.length);
  return nameSegments.join('_');
};
const mapRecurse = (packId, parent, parentPath, data) => {
  let result = {};
  let key, node, nodePath, value;
  for (key in parent) {
    node = parent[key];
    nodePath =  [...parentPath, key];
    value = data[key];
    if( typeof node === 'number' ) {
      const id = idFromPath(node, nodePath);
      if( ! result[id] ) result[id] = {};
      result[id][packId] = value;
    } else {
      if( value ) {
        result = {...result, ...mapRecurse(packId, node, nodePath, value)};
      }
    }
  }
  return result;
};
const getData = async (packId) => {
  const url = enpointUrl + params + encodeURIComponent(packId);
  const resp = await http.memGet(url);
  const data = mapRecurse(packId, dataPoints, [], resp.data);
  store.set({data});
};
export default {
  getData,
}