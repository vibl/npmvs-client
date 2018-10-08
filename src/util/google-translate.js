const scriptSrc = "//translate.google.com/translate_a/element.js?cb=googleSectionalElementInit&ug=section&hl=fr";

function googleSectionalElementInit() {
  new window.google.translate.SectionalElement({
    sectionalNodeClassName: 'goog-trans-section',
    controlNodeClassName: 'goog-trans-control',
    background: '#f4fa58'
  }, 'google_sectional_element');
}
const loadJS = function (src, cb) {
  const ref = window.document.getElementsByTagName("script")[0];
  const script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
  if (cb && typeof(cb) === "function") {
    script.onload = cb;
  }
  return script;
};
function wrap(el, wrapper) {
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
}
export const prepareTargetElement = (readme) => {
  if( readme.querySelector('.goog-trans-section') ) return null; // Target element has already been prepared.
  const doc = window.document;
  const children = readme.children;
  const elements = [...children].slice(1); //Todo: enlever tous les éléments jusqu'au premier h1 ou h2, au cas où ce n'est pas le premier élément.
  const wrapper = doc.createElement('div');
  wrapper.classList.add('goog-trans-section');
  const control = doc.createElement('div');
  control.classList.add('goog-trans-control');
  wrapper.appendChild(control);
  elements.forEach(el => wrapper.appendChild(el));
  readme.appendChild(wrapper);
};
const loadGoogleTranslate = () => {
  loadJS(scriptSrc, () => setTimeout(googleSectionalElementInit, 3000));
};

export default loadGoogleTranslate;
