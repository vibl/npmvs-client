import store from "../../data/store";

let hideInfoPageTimeout, entered;

export const clearHideTimeout = () => {
  clearTimeout(hideInfoPageTimeout);
  // console.log("hideInfoPageTimeout cleared:", hideInfoPageTimeout) ;
};

export const displayInfoPage = (packId) => {
  clearHideTimeout();
  store.set({ui:{displayPackId: packId}});
  entered = false;
};
export const hasEntered = () => {
  clearHideTimeout() ;
  entered = true;
};

export const hideInfoPage = () => {
  store.set({ui:{displayPackId: false}});
  // console.log("Page hidden after timeout:", hideInfoPageTimeout);
};

export const hideInfoPageIfEntered = () => {
  if( entered ) hideInfoPage();
};

export const hideInfoPageAfterTimeout = (timeout) => {
  hideInfoPageTimeout = setTimeout(hideInfoPage, timeout);
  // console.log("hideInfoPageTimeout set:", hideInfoPageTimeout) ;
};

export const hideInfoPageAfterTimeoutIfEntered = (timeout) => {
  if( entered ) hideInfoPageAfterTimeout(timeout)
};
