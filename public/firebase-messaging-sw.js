importScripts('https://www.gstatic.com/firebasejs/4.4.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.4.0/firebase-messaging.js');
  var config = {
    apiKey: "AIzaSyATU8O3NgExE_h6jrWjYpK2s47-YV-m1rQ",
    authDomain: "merit-95628.firebaseapp.com",
    databaseURL: "https://merit-95628.firebaseio.com",
    projectId: "merit-95628",
    storageBucket: "merit-95628.appspot.com",
    messagingSenderId: "609922366963",
    appId: "1:609922366963:web:23db734e12690b8970e686"
  };
firebase.initializeApp(config);
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
 const title = 'Hello World';
 const options = {
  body: payload.data.body
 };
 return self.registration.showNotification(title, options);
});
