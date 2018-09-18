import { createBrowserHistory } from 'history';
import {append, match} from 'ramda';
const {discard} = require('./vibl-fp').default;

export const history = createBrowserHistory();

const stringSeparator = '-vs-';
const selectionUrlSegmentRegex = /^\/?(.+)\/?$/;

export const selectionFromUrlPath = (urlPath) => {
  const lastPathSegment = match(selectionUrlSegmentRegex, urlPath)[1] || '';
  const ary = lastPathSegment.split(stringSeparator).map(decodeURIComponent);
  return  ary.length === 1 && ary[0] === '' ? [] : ary;
};
export const updateHistory = (operation, packId) => {
  const selectedAry = selectionFromUrlPath(history.location.pathname);
  const newSelectedAry = operation(packId, selectedAry);
  const locationPath =  newSelectedAry.map(encodeURIComponent).join(stringSeparator);
  return history.push(locationPath);
};
export const selectPackage = (packId) => updateHistory(append, packId);

export const deselectPackage = (packId) => updateHistory(discard, packId);
