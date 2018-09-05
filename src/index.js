import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import 'index.css';
import registerServiceWorker from './registerServiceWorker';
import init from './logic/init';

// Detect potentially avoidable rendering.
// if (process.env.NODE_ENV !== 'production') {
//   const {whyDidYouUpdate} = require('why-did-you-update');
//   whyDidYouUpdate(React);
// }
init();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
