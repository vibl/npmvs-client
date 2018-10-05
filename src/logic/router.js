import { createBrowserHistory } from 'history';
import {append, match} from 'ramda';
import {updateSelection} from "./selection";
const {discard} = require('../util/vibl-fp').default;

export const history = createBrowserHistory();

const stringSeparator = ',';
const selectionUrlSegmentRegex = /([^/]+)\/?$/;

export const selectionFromUrlPath = (urlPath) => {
  const lastPathSegment = match(selectionUrlSegmentRegex, urlPath)[1] || '';
  const ary = lastPathSegment.split(stringSeparator).map(decodeURIComponent);
  return  ary.length === 1 && ary[0] === '' ? [] : ary;
};
export const updateHistory = (operation, packName) => {
  const selectedAry = selectionFromUrlPath(history.location.pathname);
  let newSelectedAry = operation(packName, selectedAry);
  newSelectedAry.sort(); // Always sorted alphabetically. Good for SEO and CDN caching.
  const locationPath = newSelectedAry.map(encodeURIComponent).join(stringSeparator);
  return history.push(locationPath);
};
export const selectPackage = (packName) => updateHistory(append, packName);

export const deselectPackage = (packName) => updateHistory(discard, packName);

export const updateSelectionFromHistory = () => updateSelection(history.location.pathname);

history.listen((location) => {
  updateSelection(location.pathname);
});