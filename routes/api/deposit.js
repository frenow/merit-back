var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var config = require('../configs/config');
var axios = require('axios');

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

router.post('/deposit', async function(req, res, next) {
  const id_origin = req.body.id_origin;
  const id_destination = req.body.id_destination;
  const email = req.body.email;
  const token = req.body.token;
  const value = req.body.value;  //valor do deposito
  var balance_origin = 0;
  var new_balance_origin = 0;
  var balance_destination = 0;
  var new_balance_destination = 0;
  const currentdate = new Date;
  var Snapshot;

  var userRefOrigin = firebase.database().ref("/user/"+id_origin);
  var userRefDestination = firebase.database().ref("/user/"+id_destination);

      //verificar se usuario destino existe
      Snapshot = await userRefDestination.once("value");
      if (!Snapshot.val()) {
        console.log('notfound');
        res.json({
          message: 'Notfound',
          id_origin: id_origin,
          id_destination: id_destination,
          email: email,
          token: token,
          value: value,
      });
      return
      }


      //consultar se usuario origin possui saldo para fazer o deposito
      Snapshot = await userRefOrigin.once("value");
      if (Snapshot.val()) {
        balance_origin = Snapshot.val().balance;
      } else { balance_origin = 0; }

      if (value > balance_origin) //saldo inferior ao valor de deposito, mensagem de  saldo insuficiente
      {
        res.json({
          message: 'Failure',
          id_origin: id_origin,
          id_destination: id_destination,
          email: email,
          token: token,
          value: value,
          balance: balance_origin,
      });  
      } else            //saldo sera suficiente para deposito
      {
        
        //subtrair valor do deposito do saldo
        new_balance_origin = balance_origin - parseFloat(value);       
        
        //debitar saldo da carteira de origin
        await userRefOrigin.update({balance: new_balance_origin});
        
        //gravar historico debitando o deposito da carteira de origin
        userRefOrigin = firebase.database().ref("/user/"+id_origin+'/history/');
        await userRefOrigin.push({date: currentdate.toLocaleString(), origin: id_origin, destination: id_destination, note: 'Deposito feito', value: (value*-1)});


        // ----------------------------------------------------------------------------------------- //

        //consultar saldo usuario destino
        Snapshot = await userRefDestination.once("value");
        if (Snapshot.val()) {
         balance_destination = Snapshot.val().balance;
        } else { balance_destination = 0; }

       //somar valor do deposito do saldo
       new_balance_destination = balance_destination + parseFloat(value);  

        //creditar saldo da carteira de destino
        await userRefDestination.update({balance: new_balance_destination});

        //gravar historico creditando o deposito da carteira de destino
        userRefDestination = firebase.database().ref("/user/"+id_destination+'/history/');
        await userRefDestination.push({date: currentdate.toLocaleString(), origin: id_origin, destination: id_destination, note: 'Deposito recebido', value: value});

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
                  "title":"Voce acaba de enviar "+value+" Merit",
                  "body":"Voce acaba de enviar "+value+" Merit para o usuario "+id_destination,
                  "click_action": "https://silly-franklin-3c937d.netlify.app/"
                },
                "to":token
              }
        });


        res.json({
          message: 'Success',
          id_origin: id_origin,
          id_destination: id_destination,
          email: email,
          token: token,
          value: value,
          balance: new_balance_origin,
      });
  
      }

});

module.exports = router;
