import mem from "mem";
import http from './http';

export const getSuggestions = mem( async (str) => {
  if( str === '') return;
  //https://api.npms.io/v2/search?from=0&q=react%20popularity-weight%3A9%20quality-weight%3A1&size=25
  const resp = await http.get(`https://api.npms.io/v2/search/?q=${str}+boost-exact:false&size=20`);
  return resp.data.results.map( ({package: {name, description}, score}) => ({
    value: name,
    label: name,
    description: description,
    popularity: score.detail.popularity,
  }));
});