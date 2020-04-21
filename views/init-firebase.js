  var firebaseConfig = {
    apiKey: "AIzaSyATU8O3NgExE_h6jrWjYpK2s47-YV-m1rQ",
    authDomain: "merit-95628.firebaseapp.com",
    databaseURL: "https://merit-95628.firebaseio.com",
    projectId: "merit-95628",
    storageBucket: "merit-95628.appspot.com",
    messagingSenderId: "609922366963",
    appId: "1:609922366963:web:23db734e12690b8970e686"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var database = firebase.database();

function writeUserData() {
  firebase.database().ref('users/' + userId).set({
    username: "Maxwell",
    email: "maxwell@softrom.com.br"
  });
}
