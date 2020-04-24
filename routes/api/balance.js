var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var config = require('../configs/config');

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

/* GET home page. */
router.get('/balance/:id', async function(req, res, next) {
    const id = req.params.id;
    var balance = 0;

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
