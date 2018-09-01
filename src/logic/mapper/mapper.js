import mem from 'mem';
import size from "lodash/size";

export const ident = val => val;
export const none = () => undefined;
export const joinComma = ary => ary.join(", ");
export const count = val => size(val);

const mapRecurse = mapper => object => {
  let result = {};
  let key, map, type, val, res;
  for (key in object) {
    map = mapper[key];
    type = typeof map;
    val = object[key];
    if( type === 'function') {
      res = map(val);
      if( res !== undefined ) {
        result[key] = res;
      }
    }
    if( type === 'object' ) {
      result = {...result, ...mapRecurse(map)(val)};
    }
  }
  return result;
};
export const mapper = mem(mapRecurse);