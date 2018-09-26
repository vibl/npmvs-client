import http from "../../util/http";
import store from "../store";
import datapointsSpec from '../datapoints/datapoints_npms-package';
import getDatapoints from '../set-rawdata';
import updateReadme from '../update-readme';
import extract from '../extractor';

const enpointUrl = 'https://api.npms.io/v2/package/';
// const enpointUrl = 'http://localhost:3333/package/';

const getData = async (packId) => {
  const url = enpointUrl + encodeURIComponent(packId);
  const resp = await http.memGet(url);
  if( ! resp.data ) throw new Error('Data could not be downloaded from', url);
  const data = getDatapoints(datapointsSpec, 'npms', resp.data);
  const transformer = extract(data, {packId});
  store.set(transformer);
  await updateReadme(resp.data, packId);
};
export default getData;