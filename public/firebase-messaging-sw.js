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

const firebaseMessaging = firebase.messaging();

// The function that will be triggered once the browser tab is in background
// or the tab is closed completely.
firebaseMessaging.setBackgroundMessageHandler(function(payload) {
  console.log(" Received background message ", payload);

  // Set the title of notification from the payload.data object
  // Set the body from the payload.data object.
  var notificationTitle = payload.data.title;
  var notificationOptions = {
    body: payload.data.alert,
    icon: ""
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions,
  );
});

// Control what happens when someone clicks on the notification.
self.addEventListener("notificationclick", function(event) {
  event.notification.close();
  //handle click event onClick on Web Push Notification
});