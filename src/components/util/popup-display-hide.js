import store from '../../data/store';

const set = (popName, spec) => store.set({[`ui.displayHide.${popName}`]: spec});

const get = (popName) => {
  if( ! store.get().ui.displayHide ) return;
  return store.get().ui.displayHide[popName];
};

export const register = (popName) => {
  const initialValues =  {
    visible: false,
    entered: false,
    timeout: 0,
  };
  set(popName, initialValues);
};
export const unregister = (popName) => set(popName, null);

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
export const display = (popName, ...args) => {
  clearHideTimeout(popName);
  set(popName, {visible: true, entered: false});
};
export const hasEntered = (popName) => {
  clearHideTimeout(popName);
  set(popName, {visible: true, entered: true});
};
export const hide = (popName, ...args) => {
  if( get(popName).visible ) {
    set(popName, {visible: false});
  }
};
export const hideIfEntered = (popName, ...args) => {
  if( get(popName).entered ) {
    hide(popName, ...args);
  }
};
export const hideAfterTimeout = (popName, timeoutMs, ...args) => {
  if( get(popName).visible ) {
    const timeout = setTimeout(() => hide(popName, ...args), timeoutMs);
    set(popName, {timeout});
  }
};
export const hideAfterTimeoutIfEntered = (popName, timeoutMs, ...args) => {
  if( get(popName).entered ) {
    hideAfterTimeout(popName, timeoutMs, ...args);
  }
};
