import store from "../../logic/store";

let hideInfoPageTimeout, entered;

export const clearHideTimeout = () => clearTimeout(hideInfoPageTimeout);

export const displayInfoPage = (packId) => {
  clearHideTimeout();
  store.set({ui:{displayPackId: packId}});
  entered = false;
};
export const hasEntered = () => entered = true;

export const hideInfoPage = () => store.set({ui:{displayPackId: null}});

export const hideInfoPageIfEntered = () => { if( entered ) hideInfoPage() };

export const hideInfoPageAfterTimeout = () => hideInfoPageTimeout = setTimeout(hideInfoPage, 200);
