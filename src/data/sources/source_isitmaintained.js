import http from "../../util/http";
import store from "../store";
import {repoIdsFromUrl} from '../../util/utils';

const enpointUrl = 'http://cors.npmvs.com/isitmaintained.com:443/badge/';

const parseSvg = (str) => {
  const match = str.match(/>(\d+[^<]*)<\/text>/);
  return match ? match[1] : '';
};
export default async (packName) => {
  const repoFullName = await store.detect(`rawdata.${packName}.repoFullName`);
  const urlEnd = `${repoFullName}.svg`;
  const urls = [
    enpointUrl + 'resolution/' + urlEnd,
    enpointUrl + 'open/' + urlEnd,
  ];
  const svgStrings = await Promise.all(urls.map(x => http.memGetData(x, {transformResponse: x => x})));
  const [resolution, openPercent] = svgStrings.map(parseSvg);
  return {resolution, openPercent};
};