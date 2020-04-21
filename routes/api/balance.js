var express = require('express');
var router = express.Router();
var firebase = require('firebase');

/* GET home page. */
router.get('/balance/:id', async function(req, res, next) {
    const id = req.params.id;
    var balance = 0;

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
      var userReference = firebase.database().ref("/user/"+id);
      
      //consulta     
      const Snapshot = await userReference.once("value");
      balance = Snapshot.val().balance;

      res.json({
        message: 'Success',
        balance: balance,
    });

});

module.exports = router;
