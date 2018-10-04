import http from "../../util/http";
import store from "../store";

const enpointUrl = 'http://api.npmvs.com/package/';

export default async (packId) => {
  const url = enpointUrl + encodeURIComponent(packId);
  const data = await http.memGetData(url);
  store.set({rawdata:{[packId]: data}});
};
