import mem from 'mem';
import {none} from './field-mapper';

function getName(s) {
  let acc = "";
  for (let i = 0; i < s.length; i++) {
    const char = s.charAt(i);
    const lower = char.toLowerCase();
    if( char !== lower ) {
      acc += " ";
    }
    acc += i === 0 ? char.toUpperCase() : lower;
  }
  return acc;
}

const getRows = (mapper) => {
  let result = [];
  let id, map;
  for (id in mapper) {
    map = mapper[id];
    switch (typeof map) {
      case 'function':
        if( map !== none ) {
          const name = getName(id);
          result.push({id, name});
        }
        break;
      case 'object':
        result = [...result, ...getRows(map)];
        break;
      default:
    }
  }
  return result;
};

export default mem(getRows) ;