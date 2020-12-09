// Scripts need to be imported in this service worker.
// Instead of importing firebase.js we import just the firebase-app.js and firebase-messaging.js
importScripts("https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.1.1/firebase-messaging.js");

// Add your config object here.
// Obtained from the Firebase project on Firebase Console.
const FIREBASE_CONFIG = {
  // CONFIG
};

firebase.initializeApp(FIREBASE_CONFIG);

firebase.messaging();