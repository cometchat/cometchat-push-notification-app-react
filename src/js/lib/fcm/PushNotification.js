import firebase from "firebase";
import CCManager from "./../cometchat/ccManager";

var messaging = null;

var targetUrl = "http://localhost:5050";

  export const initFirebase=()=>{

    var config = {
      apiKey: "AIzaSyBkasdasdasdybyI-ZkFCxNpJLAtYyqeERw5I60yTNs",
      authDomain: "testAPP.firebaseapp.com",
      databaseURL: "https://testAPP.firebaseio.com",
      projectId: "testAPP-229414",
      storageBucket: "testAPP.appspot.com",
      messagingSenderId: "app_sender_id"
    };

    firebase.initializeApp(config);
  }

  export const init=(uid)=>{

  
    messaging = firebase.messaging();

    initializePush(uid,messaging);  
    setMessageListener(messaging);
    

  };

  function initializePush(uid,messaging) {

  messaging.requestPermission().then(() => {
          console.log("Have Permission");
          return messaging.getToken();
        }).then(token => {

          console.log("FCM Token:", token);
          subscribeUser(uid,token);
         
        })
       .catch(error => {
          if (error.code === "messaging/permission-blocked") {
             console.log("Please Unblock Notification Request Manually");
          } else {
             console.log("Error Occurred", error);
          }
         });
  }

  function setMessageListener(messaging){

    //foreground
    firebase.messaging().onMessage(function(payload) {
        messageNotification(payload);  
    });  

  };

  function messageNotification(payload){

    console.log('[inside] Received background message ' +  JSON.stringify(payload));
    
    // Customize notification here
      var notificationTitle = 'Cometchat Pro';
      var notificationOptions = {
        body: payload.data.alert,
        icon: ''
      };
  
  
    var n = new Notification(notificationTitle, notificationOptions);

    n.onclick= function(event){
      n.close();
      event.waitUntil(window.open(targetUrl));
    };
  }
    

  export const subscribeUser= (uid,token)=>{
    var channelName = CCManager.appId+"_user_"+uid;
    subscribeTokenToTopic(token,channelName);
  }


  export const subscribeGroup=(uid,type)=>{
    var channelName = CCManager.appId+"_group_"+uid;
    subscribeTokenToTopic(token,channelName);
  };



  function subscribeTokenToTopic(token, topic) {   
       
   fetch('https://ext-push-notifications.cometchat.com/fcmtokens/'+token+'/topics/'+topic, {
      method: 'POST',
      headers: new Headers({
        'Content-Type':'application/json'
      }),
      body:JSON.stringify({"appId":CCManager.appId})
    }).then(response => {
      if (response.status < 200 || response.status >= 400) {
        throw 'Error subscribing to topic: '+response.status + ' - ' + response.text();
      }
      console.log('Subscribed to "'+topic+'"');
    }).catch(error => {
      console.error(error);
    })
  }
  


 

  
