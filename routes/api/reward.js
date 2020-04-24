var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var config = require('../configs/config');

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

/* GET home page. */
router.post('/reward', async function(req, res, next) {
    const id = req.body.id;
    const email = req.body.email;
    const token = req.body.token;
    const value = req.body.value;
    var balance = 0;
    var new_balance = 0;

      var userReference = firebaseApp.database().ref("/user/"+id);
      
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
      //console.log(currentdate.toLocaleString());
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
