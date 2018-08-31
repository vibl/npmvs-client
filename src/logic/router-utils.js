import history from './history';
import {append} from "ramda";
const {discard} = require('./vibl-pure').default;

const stringSeparator = '-vs-';
const firstPathSegment = '/compare/';
const firstPathSegmentRegex = /^\/compare\/?/;

export function selectionFromPath(path) {
  const lastPathSegment = path.replace(firstPathSegmentRegex,'');
  const ary = lastPathSegment.split(stringSeparator);
  return  ary.length === 1 && ary[0] === '' ? [] : ary;
}
export function pathFromSelection(selection) {
  const lastPathSegment = selection.join(stringSeparator);
  return firstPathSegment + lastPathSegment;
}
export function getSelectionFromLocation() {
   return selectionFromPath(history.location.pathname);
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
