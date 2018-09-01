import {pipe, reduce, values} from 'ramda';
import {assocDotPath} from '../vibl-pure';

const reducer = (acc, fieldSpec) => assocDotPath(fieldSpec.path, fieldSpec.id)(acc);
const createMapper = pipe(
  values,
  reduce(reducer, {}),
);
export default createMapper;


