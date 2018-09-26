import { GraphQLClient } from 'graphql-request'
import store from '../store';
import {repoIdsFromUrl} from '../../util/utils';

const enpointUrl = 'https://api.github.com/graphql';
const apiToken = '389dfd76a9f1d65d99cf38f8f7d12ed0e97f3066';

const graphql = new GraphQLClient(enpointUrl, {
  headers: {
    authorization: 'Bearer ' + apiToken,
  },
});

const issuesTotalCountQuery = `{
  query issuesTotalCountQuery($owner: String!, $name: String!)  { 
  repository(owner:$owner, name:$name) { 
    issues {
      totalCount
    }
  }
}`;
export default async (packId) => {
  const repoFullName = await store.detect(`rawdata.${packId}.repoFullName`);
  const [owner, name] = repoFullName.split('/');
  const totalIssuesCount = await graphql.request(issuesTotalCountQuery, {owner, name});
  return {totalIssuesCount};
};