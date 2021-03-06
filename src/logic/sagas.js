import { put, takeEvery} from 'redux-saga/effects'
import {keys} from 'ramda';
import extract from '../data/extractor';
const {transform} = require('../util/vibl-fp');

const set = (transformation) => put({type: 'SET', payload: transformation});

function* worker({payload}) {
  try {
    if( ! keys(payload)[0].startsWith('rawdata')) return;
    const {rawdata} = transform(payload, {}); // Expand colpath keys.
    if( ! rawdata ) return;
    for(let packName in rawdata) {
      const packData = rawdata[packName];
      const componentData = extract(packData, {packName});
      yield set({components: componentData});
    }
  } catch (e) {
    console.log(e);
  }
}
function* saga() {
  yield takeEvery('SET', worker);
}
export default saga;