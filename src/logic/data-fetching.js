import http from './http';

const config = {
  url: {
    npmsAPI: 'https://api.npms.io/v2/package/',
    npmDownloads: 'https://api.npmjs.org/downloads/',
  }
};

export const getDownloadData = (query) => http.memGet(config.url.npmDownloads + query);

export const getPackageRawData = (packageName) => http.memGet(config.url.npmsAPI + encodeURIComponent(packageName));

export const fetchChartData = (packageName) => {
  const query = "range/2017-08-28:2018-08-28/" + encodeURIComponent(packageName) ;
  return getDownloadData(query);
};
