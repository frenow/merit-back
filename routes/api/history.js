var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var config = require('../configs/config');

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

/* GET home page. */
router.get('/history', async function(req, res, next) {

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
                      //console.log(item);
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

    var obj=[];

    var ref = firebase.database().ref("/user/"+id+"/history/");
    await ref.once("value").then(function(snapshot) {
      snapshot.forEach(function(historySnapshot) {
        
                  var item = historySnapshot.val();
                  item.key = historySnapshot.key;
                  obj.push(item);
                  //console.log(item);   
            });
        });

    res.json({
      message: 'Success',
      history: obj,
  });

});

module.exports = router;
