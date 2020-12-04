# Enhanced Push Notifications Sample App

This Sample app will help you to setup Push Notifications in your web applications using Firebase Cloud Messaging or FCM.

## Prerequisite
To run this app, you must create an account with CometChat and obtain your `App ID`, `Auth Key` and `Region`.  If you don't have an account, you can create one from <a href="https://app.cometchat.io/" target="_blank">CometChat Dashboard</a>.

## Usage

1. Clone this repository
2. Navigate to the root directory and replace `APP_ID`, `REGION` and `AUTH_KEY` with your CometChat `App ID`, `Region` and `Auth Key` in `src/consts.js` file
3. Install dependencies using `npm install`.
4. Get the `FIREBASE_CONFIG` object for your Firebase App from the <a href="https://console.firebase.com/" target="_blank">Firebase Console</a>.
5. Place the object in `src/firebase.js` and `public/firebase-messaging-sw.js`.
6. Run the app using `npm start`.
7. Open the app in 2 different browsers and login using 2 different users.
8. Minimize one of the browsers and send a message to the user logged in to it from the other browser.
9. You should be able to see the notification since the browser is not focused.
---

## Learn More

Visit our <a href="https://prodocs.cometchat.com/docs/extensions-push-notification" target="_blank">Prodocs</a> to know more about CometChat Pro Push Notifications extension.