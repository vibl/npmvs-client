import {pipeFn}  from "../../logic/mapper/field-fns";

export default ({field, pack}) => {
  const {computeFn, displayFn} = field.meta;
  return pipeFn(computeFn, displayFn)(field.data[pack]);
};