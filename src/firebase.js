
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { CometChat } from "@cometchat/chat-sdk-javascript";
export default async function firebaseInitialize(navigate) {
  const firebaseConfig = {
    apiKey: "xxxxxxxxxxxxxxxxxxxxx",
    authDomain: "xxxxxxxxxxxxxxxxxxxxx",
    projectId: "xxxxxxxxxxxxxxxxxxxxx",
    storageBucket: "xxxxxxxxxxxxxxxxxxxxx",
    messagingSenderId: "xxxxxxxxxxxxxxxxxxxxx",
    appId: "xxxxxxxxxxxxxxxxxxxxx",
    measurementId: "xxxxxxxxxxxxxxxxxxxxx"
  };

  const app = initializeApp(firebaseConfig); // Initialize Firebase App
  const messaging = getMessaging(app); // Initialize Firebase Messaging

  getToken(messaging, {
    vapidKey:
      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  })
    .then((currentToken) => {
      if (currentToken) {
        CometChat.registerTokenForPushNotification(currentToken)
          .then((payload) => {
            console.log("from comet", payload);
            console.log("curr token", currentToken);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });

  onMessage(messaging, function (payload) {
    
    const messageData = JSON.parse(payload.data.message);
    const myIcon = messageData?.data?.entities?.sender?.entity?.avatar;
    var notificationTitle = payload.data.title;
    var notificationOptions = {
      body: `${payload.data.title}: ${payload.data.alert}`,
      icon: myIcon,
    };
    var notification = new Notification(notificationTitle, notificationOptions);
    notification.onclick = function (event) {
      if(navigate) {
        navigate('/conversationsWithMessages',{state:messageData})
        return
      }
    };
  });
}
