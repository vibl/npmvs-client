import {pipeFn}  from "../../logic/field-fns";

export default ({field, pack}) => {
  const {extractFn, displayFn} = field.meta;
  return pipeFn(extractFn, displayFn)(field.data[pack]);
};