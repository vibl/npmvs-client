import fns from "../../logic/mapper/field-fns";

export default ({field, pack}) => {
  const displayFn = fns[field.meta.displayFn];
  const content = displayFn(field.data[pack]);
  return content || null;
};