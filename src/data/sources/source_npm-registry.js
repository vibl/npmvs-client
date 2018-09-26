import http from "../../util/http";

const enpointUrl = 'http://cors.npmvs.com/registry.npmjs.com:443/';

export default async (packId) => {
  const url = enpointUrl + encodeURIComponent(packId);
  return http.memGetData(url);
};