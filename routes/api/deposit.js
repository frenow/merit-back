var express = require('express');
var router = express.Router();
var firebase = require('firebase');


/* GET home page. */
router.post('/deposit', function(req, res, next) {
    const id = req.body.id;
    const balance = req.body.balance;
    const value = req.body.value;

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
      firebase.database().ref("/usuario/564844").set({
        balance: 1234
      });


    res.json({
        message: 'Success',
        id: id,
        balance: balance,
        value: value
    });

});

module.exports = router;
