import pMap from '../util/p-map';
import {fetchFromSource} from './sources/index';
import setRawData from './set-rawdata';

const activeSources = [
  // 'github-repo',
  // 'isitmaintained',
  // 'npm-registry',
  // 'github-graphql',
  // 'libio-main',
  // 'npmvs',
  // 'npm-downloads',
];

export const fetchDataForPackage = async (packId) => {
  fetchFromSource('npmvs', packId);
  const getData = (sourceName) =>
    fetchFromSource(sourceName, packId).then( rawdata => setRawData({sourceName, packId, rawdata}));
  pMap(activeSources, getData);
};