import state from "./store";

let mouseOutTimeout;

export const setFocus = (packId) => {
  state.set({focus: packId});
};
// export const unsetFocus = () => {
//   state.set({focus: undefined});
// };
// export const unsetFocusTimeout = () => {
//   mouseOutTimeout = setTimeout(unsetFocus, 200);
// };