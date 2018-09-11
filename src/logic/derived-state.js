import mem from 'mem';
import {zipObj} from 'ramda'
const {hsl} = require('./vibl-pure');

const darken = (lightness) => lightness * 0.6;

export const getPackageColors = mem( (colorObj, selection) => {
  const {hues, hueOffset, saturation, lightness} = colorObj;
  return zipObj(selection, selection.map( (val, i) => {
    const hue = hues[i] + hueOffset;
    const color = hsl(hue, saturation, lightness);
    const colorDarker = hsl(hue, saturation, darken(lightness));
    return {...colorObj, hue, color, colorDarker};
  }));
  }
);
export const getUnfocusedColor = mem( (lightness) => hsl(0, 0, (100 - (100 - lightness) * 0.5)));