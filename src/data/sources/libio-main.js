import http from "../../logic/http";
import store from "../../logic/store";
import dataPoints from '../datapoints/libio-main_datapoints';
import getDatapoints from '../getDatapoints';
import extract from '../extractor';

const enpointUrl = 'https://libraries.io/api/npm/';
const apiKey = "653f8ad38c7c9c60ac58a88f8e9a0876";
const queryStr = `?api_key=${apiKey}`;

const getData = async (packId) => {
  const url = enpointUrl + encodeURIComponent(packId) + queryStr;
  const resp = await http.memGet(url);
  if( ! resp.data ) throw new Error('Data could not be downloaded from', url);
  const data = getDatapoints(dataPoints, 'libio-main', resp.data);
  const transformer = extract(data, {packId});
  store.trans(transformer);
};
export default {
  getData,
}