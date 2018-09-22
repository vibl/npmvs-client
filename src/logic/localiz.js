import deepForceUpdate from 'react-deep-force-update';
import store from './store';
import loadGoogleTranslate from './google-translate';

const languages = ['en', 'fr'];
const splitChar = '<>';

const fullDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
const fullDateTime = {...fullDate, hour: 'numeric', minute: '2-digit'};
const fullDateTimeSeconds = {...fullDateTime, second: '2-digit'};
const dateFormats = {fullDate, fullDateTime};

let
  dictionary = {},
  currentLanguage,
  appInstance;

const getUserLanguage = () => {
  const lang = navigator.language.slice(0,2);
  return languages.indexOf(lang) || 0;
};

export const switchLanguage = (arg) => {
  if( arg ) {
    if (typeof arg === 'string') {
      currentLanguage = languages.indexOf(arg) || 0
    }
    if (typeof arg === 'number') {
      currentLanguage = languages[arg] ? arg : 0;
    }
  } else {
    currentLanguage = 1 - currentLanguage;
  }
  const lang = languages[currentLanguage];
  if( lang === 'fr' ) loadGoogleTranslate();
  store.set({session:{language: lang}});
  // Will force-update the whole rendered tree
// even if components in the middle of it
// define a strict shouldComponentUpdate().

  deepForceUpdate(appInstance);
  return lang;
};
export const getTranslation = (str) => {
  const key = str.trim();
  return currentLanguage === 0 ? str : (dictionary[key] && dictionary[key][currentLanguage - 1] ) || str;
};
export const localiz = (...list) => {
  const versions = list.map(s => s.trim());
  const base = versions.shift();
  dictionary[base] = versions;
};
export const getSessionLocale = () => store.get().session.language;

export const getFullDate = (date = new Date, format = 'fullDateTime') => {
  return date.toLocaleString(getSessionLocale(), dateFormats[format]);
};
export const l = (parts, ...args) => {
  let str;
  if( Array.isArray(parts) ) {
    let acc = parts[0];
    let i, max = parts.length;
    for(i=1; i < max; i++) {
      acc += args[i-1] + parts[i];
    }
    str = acc;
  } else {
    str = parts;
  }
  const versions = str.split(splitChar);
  if( versions.length > 1 ) localiz(...versions);
  return getTranslation(versions[0]);
};
export const localizInit = (thisApp) => {
  appInstance = thisApp; // Useful for reloading the whole app when language is switched.
  const lang = getSessionLocale() || getUserLanguage();
  switchLanguage(lang);
};
export default l;



