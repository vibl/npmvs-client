import mem from 'mem';

const hsl = (h, s, l) => `hsl(${h},${s}%,${l}%)`

export const getPackageColors = mem( (color, selection) => {
  const {hues, hueOffset, saturation, lightness} = color;
  return selection.map( (val, i) => {
    const hue = hues[i] + hueOffset;
    const value = hsl(hue, saturation, lightness);
    return {...color, hue, value};
  });
  }
);
export const getUnfocusedColor = mem( (lightness) => hsl(0, 0, (100 - (100 - lightness) * 0.5)));