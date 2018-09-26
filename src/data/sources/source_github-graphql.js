import { GraphQLClient } from 'graphql-request'
import store from '../store';

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
  const repoUrl = await store.detect(`rawData.${packId}.repository`);
  const [_, owner, name] = repoUrl.match(/https?:\/\/github\.com\/([^/]+)\/([^/]+)/);
  const totalIssuesCount = await graphql.request(issuesTotalCountQuery, {owner, name});
  return({totalIssuesCount});
};