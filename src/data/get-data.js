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

export const fetchDataForPackage = async (packName) => {
  fetchFromSource('npmvs', packName);
  const getData = (sourceName) =>
    fetchFromSource(sourceName, packName).then( rawdata => setRawData({sourceName, packName, rawdata}));
  pMap(activeSources, getData);
};