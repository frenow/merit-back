var express = require('express');
var router = express.Router();
var firebase = require('firebase');

/* GET home page. */
router.get('/history', async function(req, res, next) {

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

      var obj=[];

      var ref = firebase.database().ref();
      await ref.once("value").then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            childSnapshot.forEach(function(childchildSnapshot) {
                childchildSnapshot.forEach(function(childchildchildSnapshot) {
                    childchildchildSnapshot.forEach(function(historySnapshot) {
                      var item = historySnapshot.val();
                      item.key = historySnapshot.key;
                      obj.push(item);
                      console.log(item);
                    });
                });
            });
         });
    });

      res.json({
        message: 'Success',
        history: obj,
    });

});

/* GET home page. */
router.get('/history/:id', async function(req, res, next) {
  const id = req.params.id;
  
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

    var obj=[];

    var ref = firebase.database().ref("/user/"+id+"/history/");
    await ref.once("value").then(function(snapshot) {
      snapshot.forEach(function(historySnapshot) {
        
                  var item = historySnapshot.val();
                  item.key = historySnapshot.key;
                  obj.push(item);
                  console.log(item);
   
            });
        });

    res.json({
      message: 'Success',
      history: obj,
  });

});

module.exports = router;
