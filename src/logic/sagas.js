import { put, takeEvery} from 'redux-saga/effects'
import extract from '../data/extractor';
const {getDotPath, transform} = require('../util/vibl-fp');

const set = (transformation) => put({type: 'SET', payload: transformation});

function* worker({payload}) {
  try {
    const transformation = transform(payload, {}); // Expand dotpath keys.
    const rawData = getDotPath('rawdata', transformation);
      for(let packName in rawData) {
        const packData = rawData[packName];
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