import http from "../../util/http";
import store from "../store";

const enpointUrl = 'http://api.npmvs.com/package/';

export default async (packName) => {
  const url = enpointUrl + encodeURIComponent(packName);
  const data = await http.memGetData(url);
  store.set({rawdata:{[packName]: data}});
};
