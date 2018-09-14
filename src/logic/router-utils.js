import history from './history';
import {append, match} from 'ramda';
const {discard} = require('./vibl-fp').default;

const stringSeparator = '-vs-';
const firstPathSegment = '/compare/';
const lastUrlSegmentRegex = /\/compare\/(.+)\/?$/;

export const selectionFromUrlPath = (urlPath) => {
  const lastPathSegment = match(lastUrlSegmentRegex, urlPath)[1] || '';
  const ary = lastPathSegment.split(stringSeparator);
  return  ary.length === 1 && ary[0] === '' ? [] : ary;
};

export function pathFromSelection(selection) {
  const lastPathSegment = selection.join(stringSeparator);
  return firstPathSegment + lastPathSegment;
}
export function getSelectionFromLocation() {
   return selectionFromUrlPath(history.location.pathname);
}
export function pushHistoryFromSelection(selection) {
  const locationPath = pathFromSelection(selection);
  return history.push(locationPath);
}
export function pushHistoryWithSelectionFn(fn) {
  const selectedAry = getSelectionFromLocation();
  const newSelectedAry = fn(selectedAry);
  return pushHistoryFromSelection(newSelectedAry);
}
export const selectPackage = (packageName) => pushHistoryWithSelectionFn(append(packageName));

export const deselectPackage = (packageName) => pushHistoryWithSelectionFn(discard(packageName));
