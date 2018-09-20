import store from "../../logic/store";

let hideInfoPageTimeout;

export const clearHideTimeout = () => clearTimeout(hideInfoPageTimeout);

export const displayInfoPage = (packId) => {
  clearHideTimeout();
  store.set({ui:{displayPackId: packId}});
};
export const hideInfoPage = () => store.set({ui:{displayPackId: null}});

export const hideInfoPageAfterTimeout = () => hideInfoPageTimeout = setTimeout(hideInfoPage, 100);
