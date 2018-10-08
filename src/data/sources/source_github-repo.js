import http from "../../util/http";
import store from '../store';
import secrets from '../secrets';

const endpointUrl = 'https://api.github.com/repos/';
const apiToken = secrets.apiAccessTokens.github;

export default async (packName) => {
  const repoUrl = await store.detect(`rawdata.${packName}.repository_url`);
  const match = repoUrl.match(/github\.com\/([^/]+\/[^/.#]+)/);
  const presumedFullName = match ? match[1] : null;
  if( ! presumedFullName ) return {};
  const url = endpointUrl + presumedFullName;
  const data = await http.memGetData(url, {auth: {username: 'vibl', password: apiToken}});
  // TODO: get datapoints from data.
  return {repoFullName: data.full_name};
};