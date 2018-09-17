import http from "../../logic/http";
import store from "../../logic/store";

const endpointUrl = 'https://api.npmjs.org/downloads/range/';

const params = '2016-09-01:2018-08-31/';
const getData = async (packId) => {
  const url = endpointUrl + params + encodeURIComponent(packId);
  const resp = await http.memGet(url);
  store.set({data:{[packId]:{downloads: resp.data.downloads}}});
};
export default {
  getData,
}