import mem from 'mem';
import http from './http';
import store from './store';

export const getSuggestions = mem(async (str) => {
  const query = `https://api.npms.io/v2/search/?q=${str}+boost-exact:false&size=20`;
  const resp = await http.debounceGet(query);
  return resp.data.results.map( ({package: {name, description}, score}) => ({
    value: name,
    label: name,
    description: description,
    popularity: score.detail.popularity,
  }));
});

export const displayInfoPage = (packId) => store.set({ui:{displayPackId: packId}});

export const hideInfoPage = () => store.set({ui:{displayPackId: null}});

