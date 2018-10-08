// import pMap from '../util/p-map';
import getDataFromNpmvs from './sources/source_npmvs.js';
// import setRawData from './set-rawdata';


export const fetchDataForPackage = async (packName) => {
  getDataFromNpmvs(packName);
};