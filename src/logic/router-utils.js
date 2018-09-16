import history from './history';
import {append, match} from 'ramda';
const {discard} = require('./vibl-fp').default;

const stringSeparator = '-vs-';
const lastUrlSegmentRegex = /\/(.+)\/?$/;

export const selectionFromUrlPath = (urlPath) => {
  const lastPathSegment = match(lastUrlSegmentRegex, urlPath)[1] || '';
  const ary = lastPathSegment.split(stringSeparator);
  return  ary.length === 1 && ary[0] === '' ? [] : ary;
};

export const pathFromSelection =  selection => selection.join(stringSeparator);

export const getSelectionFromLocation = () => selectionFromUrlPath(history.location.pathname);

export const pushHistoryFromSelection = (selection) => {
  const locationPath = pathFromSelection(selection);
  return history.push(locationPath);
};
export const pushHistoryWithSelectionFn = (fn) => {
  const selectedAry = getSelectionFromLocation();
  const newSelectedAry = fn(selectedAry);
  return pushHistoryFromSelection(newSelectedAry);
};
export const selectPackage = (packageName) => pushHistoryWithSelectionFn(append(packageName));

export const deselectPackage = (packageName) => pushHistoryWithSelectionFn(discard(packageName));
