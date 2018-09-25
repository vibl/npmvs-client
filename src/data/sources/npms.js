import http from "../../logic/http";
import store from "../../logic/store";
import datapointsSpec from '../datapoints/npms_datapoints';
import getDatapoints from '../getDatapoints';
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
  store.trans(transformer);
  await updateReadme(resp.data, packId);
};
export default {
  getData,
}