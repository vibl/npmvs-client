import mem from "mem";
import http from './http';

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