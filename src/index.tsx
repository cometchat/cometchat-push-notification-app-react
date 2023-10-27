import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import { UIKitSettingsBuilder } from "@cometchat/uikit-shared";
import { CometChatConstants } from "./const";
import { CometChatUIKit } from "@cometchat/chat-uikit-react";
import { CometChatCalls } from "@cometchat/calls-sdk-javascript";
(async () => {
  const uiKitSettings = new UIKitSettingsBuilder()
    .setAppId(CometChatConstants.appId)
    .setRegion(CometChatConstants.region)
    .setAuthKey(CometChatConstants.authKey)
    .subscribePresenceForFriends()
    .build();

  const callAppSetting = new CometChatCalls.CallAppSettingsBuilder()
    .setAppId(CometChatConstants.appId)
    .setRegion(CometChatConstants.region)
    .build();

  try {
    await CometChatUIKit.init(uiKitSettings);
    await CometChatCalls.init(callAppSetting);
    console.log("Initialization completed successfully");

    const root = ReactDOM.createRoot(
      document.getElementById("root") as HTMLElement
    );

    root.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    askPermission();
  } catch (error) {
    console.log("Initialization failed with error:", error);
  }
})();

if ("serviceWorker" in navigator) {
  console.log("serviceWorker");
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")

    .then(function (registration) {
      console.log("registration", registration);
      console.log("Registration succlgcessful, scope is:", registration.scope);
    })
    .catch((error) => console.log("Registration error", error));
}

async function askPermission() {
  return new Promise(function (resolve, reject) {
    const permissionResult = Notification.requestPermission(function (result) {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  }).then(function (permissionResult) {
    if (permissionResult !== "granted") {
      // throw new Error("We weren't granted permission.");
      console.log("permission not granted");
    }
  });
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
