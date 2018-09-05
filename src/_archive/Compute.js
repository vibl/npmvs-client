import {fn} from "../logic/mapper/field-fns";

export default ({field, pack}) => {
  const {computeFn} = field.meta;
  const content = fn[computeFn](field.data[pack]);
  return content || null;
};