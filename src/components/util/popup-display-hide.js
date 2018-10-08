import store from '../../data/store';

const initialValues =  {
  visible: false,
  entered: false,
  timeout: 0,
};

const set = (popName, spec) => store.set({[`ui:displayHide:${popName}`]: spec});

const get = (popName) => {
  const state = store.get().ui.displayHide[popName];
  return state || initialValues;
};
export const registerPopup = (popName) => {

  set(popName, initialValues);
};
export const unregisterPopup = (popName) => set(popName, null);

export const clearHideTimeout = (popName) => {
  const timeout = get(popName).timeout;
  if( ! timeout ) return;
  try {
    clearTimeout(get(popName).timeout);
    set(popName, {timeout: 0})
  }
  catch(err) {
    console.log(err);
  }
};
export const displayPopup = (popName) => {
  clearHideTimeout(popName);
  set(popName, {visible: true, entered: false});
};
export const hasEntered = (popName) => {
  clearHideTimeout(popName);
  set(popName, {visible: true, entered: true});
};
export const hidePopup = (popName) => {
  if( get(popName).visible ) {
    set(popName, {visible: false});
  }
};
export const hidePopupIfEntered = (popName) => {
  if( get(popName).entered ) {
    hidePopup(popName);
  }
};
export const hidePopupAfterTimeout = (popName, timeoutMs) => {
  if( get(popName).visible ) {
    const timeout = setTimeout(() => hidePopup(popName), timeoutMs);
    set(popName, {timeout});
  }
};
export const hidePopupAfterTimeoutIfEntered = (popName, timeoutMs) => {
  if( get(popName).entered ) {
    hidePopupAfterTimeout(popName, timeoutMs);
  }
};
