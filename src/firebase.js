import firebase from "firebase/app";
import "firebase/messaging";
 
const FIREBASE_CONFIG = {
  // CONFIG
};

// Initialize Firebase
const initializedFirebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
 
const messaging = initializedFirebaseApp.messaging();
export { messaging };