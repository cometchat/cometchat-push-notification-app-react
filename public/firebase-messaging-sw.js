// /* eslint-disable no-restricted-globals */
// /* eslint-disable no-undef */
// // required to setup background notification handler when browser is not in focus or in background and
// // In order to receive the onMessage event,  app must define the Firebase messaging service worker
// // self.importScripts("localforage.js");

importScripts(
  "https://www.gstatic.com/firebasejs/9.15.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging-compat.js"
);
// var TAG = "[Firebase-sw.js]"
// // Set Firebase configuration, once available
// self.addEventListener("notificationclick", function (event) {
//   console.log(TAG, "notificationclick", event);
//   if (event?.notification?.data) {
//     let data = event.notification.data;
//     if (data.FCM_MSG) {
//       if (data.FCM_MSG?.data?.message) {
//         let message = JSON.parse(data.FCM_MSG?.data?.message);
//         clients.matchAll().then((clientList) => {
//           if (clientList.length > 0) {
//             clientList[0].postMessage({
//               message,
//             });
//           }
//         });
//       }
//     }
//   }
//   event.notification.close();

// "Default" Firebase configuration (prevents errors)
const defaultConfig = {
  apiKey: true,
  projectId: true,
  messagingSenderId: true,
  appId: true,
};

// Initialize Firebase app
firebase.initializeApp(self.firebaseConfig || defaultConfig);
let messaging;
try {
  messaging = firebase.messaging();
} catch (err) {
  console.error("Failed to initialize Firebase Messaging", err);
}

