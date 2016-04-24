import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import Bluebird from 'bluebird';

import store from './redux/store.js';
import Gallery from './containers/gallery/gallery';

window.Promise = Bluebird;

ReactDOM.render(
  <Provider store={store}>
    <Gallery />
  </Provider>
  , document.getElementById('app')
);