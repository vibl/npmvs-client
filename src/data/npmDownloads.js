import http from "../logic/http";
import store from "../logic/store";

export const numberOfMonths = 18;
const endpointUrl = 'https://api.npmjs.org/downloads/range/';
// const lastMonth = () => {
//   const today = new Date();
//   const thisMonth = today.getMonth();
//   const thisYear = today.getFullYear();
//   const this-day
// };
// const lastFullMonth = getLastFullMonth();
const params = '2017-03-01:2018-08-31/';
const getData = async (packId) => {
  const url = endpointUrl + params + encodeURIComponent(packId);
  const resp = await http.memGet(url);
  store.trans({data:{downloads:{[packId]: resp.data.downloads}}});
};
export default {
  getData,
}