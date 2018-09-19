import memoize from '../lib/memoize-immutable';
import MixedTupleMap from 'mixedtuplemap';
import {createSelectorCreator} from 'reselect';

import {keys, map, zipObj} from 'ramda'
const {getDotPath, gradient, hsl, isEmpty} = require('./vibl-fp');

export const mem = memoize;
export const memGC = fn => memoize(fn, {cache: new MixedTupleMap()});

export const getData = mem(
  (extractFn, ...datapoints) => {
    if( datapoints.some(isEmpty) ) return null;
    const packIds = keys(datapoints[0]);
    let packData, packId, acc = {};
    for( packId of packIds ) {
      packData = datapoints.map(o => o[packId]);
      if( packData.some(isEmpty) ) return null;
      acc[packId] = extractFn(...packData);
    }
    return acc;
  }
);
const darken = (lightness) => lightness * 0.6;

export const getPackageColors = mem( (colorObj, selection) => {
  const {hues, hue: hueOffset, saturation, lightness} = colorObj;
  return zipObj(selection, selection.map( (val, i) => {
    const hue = hues[i] + hueOffset;
    const baseColor = hsl(hue, saturation, lightness);
    const colorDarker = hsl(hue, saturation, darken(lightness));
    const lightGradient = gradient(baseColor, hsl(hue, saturation, lightness - 10));
    return {...colorObj, hue, baseColor, colorDarker, lightGradient};
  }));
  }
);
export const toHtmlClass = str => str.replace(/[^\w\d\-_]/g, '_');

export const createSelector = createSelectorCreator(mem);

