const express = require('express');
const router = express.Router();
var axios = require('axios');
var firebase = require('firebase');

router.get('/', require('connect-ensure-login').ensureLoggedIn(),
(req, res) => {

    var config = {
        apiKey: "AIzaSyATU8O3NgExE_h6jrWjYpK2s47-YV-m1rQ",
        authDomain: "merit-95628.firebaseapp.com",
        databaseURL: "https://merit-95628.firebaseio.com",
        projectId: "merit-95628",
        storageBucket: "merit-95628.appspot.com",
        messagingSenderId: "609922366963",
        appId: "1:609922366963:web:23db734e12690b8970e686"
      };
      if (!firebase.apps.length) {
        firebase.initializeApp(config);
      }
      //firebase.database().ref('/TestMessages').set({TestMessage: 'GET Request'});
      var userReference = firebase.database().ref("/usuario/"+req.user.id);
      var token;
      
      //firebase.database().ref("/usuario/"+req.user.id).set({
      //  balance: 500
      //});
      
      userReference.on("value", 
                  function(snapshot) {
                        console.log("snapshot : "+ snapshot.val().token);
              token = snapshot.val().token;
              //res.json(snapshot.val());
                        userReference.off("value");
                        }, 
                  function (errorObject) {
                        console.log("The read failed: " + errorObject.code);
                        //res.send("The read failed: " + errorObject.code);
                 }); 

        
        setTimeout(function() {    
            axios(
                {
                    url: 'https://fcm.googleapis.com/fcm/send',
                    method: 'post',
                    headers: {
                      "Content-Type":"application/json",
                      "Authorization":"key=AAAAjgI0vfM:APA91bGo66e6F7ikV8k4SwfsjSOqIoTZJ7vFek--csDOD6oCXt0chO99UP9sI0v30AYd6HlU_NhipN6UFuu1Wowj1gcAGTgxqLaDatPFC-bvRERnRnW_w0Ed9FQnvKgGDNtCDWJOmJ3e"
                    },
                    data: {
                        "notification": {
                          "title":"Voce acaba de receber 10und Merit",
                          "text":"O usuario 123 enviou 10und Merit para voce.",
                          "sound":"default"
                        },
                        "to":token,
                        "priority":"high"
                      }
                  }
            ).then((r) => {
                //console.log(r.data)
              }).catch((error) => {
                console.log(error)
              });
            }, 5000);

    //estratégia para garantir que os logins de steam se comportem de maneira uniforme
    //em princípio, criar o próprio objeto user e carregá-lo com os valores de diversas
    //mídias sociais

    if(req.user.id === undefined){
        req.user = {id: req.user._json.steamid, displayName: req.user._json.personaname};
    }
    //console.log({...req.user});
    res.render('profile', { profile: req.user});
}

)
module.exports = router;