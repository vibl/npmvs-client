import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

// const whyDidYouUpdate = require('why-did-you-update');
// whyDidYouUpdate(React);

// Detect potentially avoidable rendering.
// if (process.env.NODE_ENV !== 'production') {
//   const {whyDidYouUpdate} = require('why-did-you-update');
//   whyDidYouUpdate(React);
// }

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
