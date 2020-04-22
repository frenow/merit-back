var express = require('express');
var router = express.Router();
var firebase = require('firebase');

/* GET home page. */
router.post('/reward', async function(req, res, next) {
    const id = req.body.id;
    const email = req.body.email;
    const token = req.body.token;
    const value = req.body.value;
    var balance = 0;
    var new_balance = 0;

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
      if (Snapshot.val()) {
        balance = Snapshot.val().balance;
      } else { balance = 0; }

      //somatorio
      new_balance = balance + value;

      //gravar novo valor
      await userReference.update({balance: new_balance});

      //gravar historico 
      const currentdate = new Date;
      console.log(currentdate.toLocaleString());
      userReference = firebase.database().ref("/user/"+id+'/history/');
      await userReference.push({date: currentdate.toLocaleString(), origin: 'money safe', destination: id, note: 'Resgate mensal', value: value});

      res.json({
        message: 'Success',
        id: id,
        email: email,
        token: token,
        value: value,
        balance: new_balance,
    });

});

module.exports = router;
