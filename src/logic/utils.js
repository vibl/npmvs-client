import memoize from '../lib/memoize-immutable';
import MixedTupleMap from 'mixedtuplemap';
import {zipObj} from 'ramda'
const {getDotPath, hsl} = require('./vibl-fp');

export const mem = memoize;
export const memGC = fn => memoize(fn, {cache: new MixedTupleMap()});

export const getData = mem(
  ({data}, path, extractFn) => {
    if( ! data ) return;
    let acc = {}, key;
    for(key in data) {
      const datapoint = getDotPath(path, data[key]);
      if( ! datapoint ) return;
      acc[key] = extractFn ? extractFn(datapoint) : datapoint;
    }
    return acc;
  }
);
const darken = (lightness) => lightness * 0.6;

export const getPackageColors = mem( (colorObj, selection) => {
  const {hues, hue: hueOffset, saturation, lightness} = colorObj;
  return zipObj(selection, selection.map( (val, i) => {
    const hue = hues[i] + hueOffset;
    const color = hsl(hue, saturation, lightness);
    const colorDarker = hsl(hue, saturation, darken(lightness));
    return {...colorObj, hue, color, colorDarker};
  }));
  }
);

