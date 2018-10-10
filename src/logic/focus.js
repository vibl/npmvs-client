import store from "../data/store";

export const setFocus = (id) => {
  let n =
    typeof id === 'number'
      ? id
      : store.get().selection.indexOf(id);
  if( n < 0 ) n = 0;
  store.set({'ui:focus': n});
};
export const unsetFocus = () => {
  let newFocus = store.get().ui.focus - 1;
  if( newFocus < 0 ) newFocus = 0;
  store.set({'ui:focus': newFocus});
};

