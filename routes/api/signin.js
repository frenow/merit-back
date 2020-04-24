var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var config = require('../configs/config');

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

/* GET home page. */
router.post('/signin', async function(req, res, next) {
    const id = req.body.id;
    const email = req.body.email;
    const token = req.body.token;

      var userReference = firebase.database().ref("/user/"+id);

      //gravar novo valor
      await userReference.update({email: email, token: token});

      res.json({
        message: 'Success',
        id: id,
        email: email,
        token: token,
    });

});

module.exports = router;
