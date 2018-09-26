import http from "../../util/http";

const enpointUrl = 'https://libraries.io/api/npm/';
const apiKey = "653f8ad38c7c9c60ac58a88f8e9a0876";
const queryStr = `?api_key=${apiKey}`;

export default async (packId) => {
  const url = enpointUrl + encodeURIComponent(packId) + queryStr;
  return http.memGetData(url);
};
