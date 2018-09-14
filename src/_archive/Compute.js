import {pipeFn} from "../logic/field-fns";

export default ({field, pack}) => {
  const {extractFn} = field.meta;
  const content = pipeFn[extractFn](field.data[pack]);
  return content || null;
};