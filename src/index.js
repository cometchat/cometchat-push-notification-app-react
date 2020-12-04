import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './store/reducer';

import { CometChat } from "@cometchat-pro/chat"
import { COMETCHAT_CONSTANTS } from './consts';

const store = createStore(reducer, compose(applyMiddleware(thunk)));

const appID = COMETCHAT_CONSTANTS.APP_ID;
const region = COMETCHAT_CONSTANTS.REGION;

const appSettings = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();

// 1. Initialize the CometChat app
// On successful initialization, proceed to render your app
// Log a message to the console on failure.
//
// Next, we register the Service Worker below.
CometChat.init(appID, appSettings).then(() => {
  if (CometChat.setSource) {
    CometChat.setSource('ui-kit', 'web', 'reactjs');
  }
  console.log('Initialization successful');
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
}, error => {
  console.log('Initialization failed', error);
});

// 2. Register the Service Worker
// To ensure delivery of notifications when the tab is not in focus
// or the user has closed your application's browser tab.
// Checkout public/firebase-messaging-sw.js file for more details.
// You need to add the FIREBASE_CONFIG object in that file.
//
// Next, proceed to Home.js for Step 3.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(error => console.log('Registration error', error));
}
