import {pipeFn} from "../logic/mapper/field-fns";

export default ({field, pack}) => {
  const {computeFn} = field.meta;
  const content = pipeFn[computeFn](field.data[pack]);
  return content || null;
};