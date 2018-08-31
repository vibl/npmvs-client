import axios from 'axios';
import mem from 'mem';

// const serverBaseURL = 'https://api.npms.io/';
//
// const defaultAxiosOptions = {
//   baseURL: serverBaseURL,
//   timeout: 1000,
// };
//
// const options = {
//   ...defaultAxiosOptions,
// };
// const http = axios.create(options);

export const get = (...args) => {
  console.log("API GET query: ", args);
  return axios.get(...args);
};

export const memGet = mem(get);

export default {
  get,
  memGet,
}