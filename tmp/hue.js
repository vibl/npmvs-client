const {zipObj} = require('ramda');

const nextHue = (hues) => {
  const gaps = [];
  let i;
  for( i=0;i<hues.length;i++) {
    gap = hues[i+1] - hues[i];
    gaps.push(gap < 0 ? (gap + 360) % 360 : gap);
  }
  const largestGap = Math.max(...gaps);
  

  for( hue of hues) {
    gaps[hue] =
  }

  while(true) {
    hue = (last + increment) % 360;
    if( hues.indexOf(hue) === -1 ) {
      return hue;
    } else {
      increment = increment / 2;
    }
  }
};

const nextHue = (hues) => {
  let increment = 240;
  let last = hues[hues.length - 1];
  
  while(true) {
    hue = (last + increment) % 360;
    if( hues.indexOf(hue) === -1 ) {
      return hue;
    } else {
      increment = increment / 2;
    }
  }
};
const getHue = (baseHue, n) => {
  let i,
      adjusted,
      increment = 120,
      hue = baseHue,
      hues = [baseHue];
  for(i=1; i<n; i++) {
    hue += increment;
    adjusted = hue % 360;
    if( hues.indexOf(adjusted) === -1 ) {
      hues.push(adjusted);
      if(increment < 120) increment = 120;
    } else {
      increment = increment / 2;
    }
  }
  return hues;
};

const getHue_ = (baseHue, n) => {
  const turns = Math.floor(n / 3);
  return ( baseHue + n * 120 + 60 / turns * 30 ) % 360;

};
const baseHue = 0;

// for( let i=0; i<10 ; i++) {         (adjusted);
//   console.log(getHue(baseHue, i));
// }

// [ 0, 120, 240, 60, 180, 300, 150, 270, 30, 210, 330, 90, 315 ]
const hues = [0, 120, 240, 60, 180, 300, 90, 270, 30, 150, 330, 210];

console.log(getHue(baseHue, 20));
console.log(nextHue(hues));

// 0 => 0
// 1 => 120
// 2 => 240
// 3 => 60
// 4 => 180
// 5 => 300
// 6 => 30
// 7 => 150


