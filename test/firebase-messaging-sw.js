importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase.js");

var config = {

    messagingSenderId: "app_sender_id"
  };

var targeturl="http://localhost:5050";
var notificationTitle ="CometChat Pro";

firebase.initializeApp(config);

const messaging = firebase.messaging();

  
 //background
    messaging.setBackgroundMessageHandler(function(payload) {
      console.log('[firebase-messaging-sw.js] Received background message ', payload);
      // Customize notification here
      
      var notificationOptions = {
        body: payload.data.alert,
        icon: ''
      };
    
      return self.registration.showNotification(notificationTitle, notificationOptions);
    });
    // [END background_handler]

    self.addEventListener('notificationclick', function(event) {
        event.notification.close();
        event.waitUntil(self.clients.openWindow(targeturl));
    });