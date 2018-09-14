import {filter, pick, pipe, reduce, values} from 'ramda';
const {assocDotPath} = require('../../logic/vibl-fp');

const reducer = (acc, fieldSpec) => assocDotPath(fieldSpec.path, pick(['id', 'rawFn'], fieldSpec))(acc);
export default (source, fieldSpecs) => pipe(
  values,
  filter( o => o.source === source ),
  reduce(reducer, {}),
)(fieldSpecs);


