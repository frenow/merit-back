var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var config = require('../configs/config');
var axios = require('axios');

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

      var userReference = firebase.database().ref("/user/"+id);
      
      //consulta     
      const Snapshot = await userReference.once("value");
      if (Snapshot.val()) {
        balance = Snapshot.val().balance;
      } else { balance = 0; }

      //somatorio
      new_balance = balance + parseFloat(value);  

      //gravar novo valor
      await userReference.update({balance: new_balance});

      //gravar historico 
      const currentdate = new Date;
      //console.log(currentdate.toLocaleString());
      userReference = firebase.database().ref("/user/"+id+'/history/');
      await userReference.push({date: currentdate.toLocaleString(), origin: 'money safe', destination: id, note: 'Resgate mensal', value: value});


      //Enviar notificacao  
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
                      "title":"Voce acaba de receber "+value+" Merit",
                      "body":"O usuario money safe enviou "+value+" Merit para voce.",
                      "click_action": "https://silly-franklin-3c937d.netlify.app/"
                    },
                    "to":token
                  }
              });

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
