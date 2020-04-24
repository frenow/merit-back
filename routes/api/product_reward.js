var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var config = require('../configs/config');

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

router.post('/product_reward', async function(req, res, next) {
  const id = req.body.id;
  const email = req.body.email;
  const token = req.body.token;
  const value = req.body.value;  //valor do resgate
  
  var balance = 0;
  var new_balance = 0;

  const currentdate = new Date;
  var Snapshot;

  var userRef = firebase.database().ref("/user/"+id);

      //consultar se usuario origin possui saldo para fazer o resgate do produto
      Snapshot = await userRef.once("value");
      if (Snapshot.val().balance) {
        balance = Snapshot.val().balance;
      } else { balance = 0; }

      if (value > balance) //saldo inferior ao valor do produto, mensagem de  saldo insuficiente
      {
        res.json({
          message: 'Failure',
          id: id,
          email: email,
          token: token,
          value: value,
          balance: balance,
      });  
      } else            //saldo sera suficiente para resgate do produto
      {
        
        //subtrair valor do resgate do saldo
        new_balance = balance - parseFloat(value);       
        
        //debitar saldo da carteira
        await userRef.update({balance: new_balance});
        
        //gravar historico debitando o resgate da carteira
        userRef = firebase.database().ref("/user/"+id+'/history/');
        await userRef.push({date: currentdate.toLocaleString(), origin: id, destination: 'money safe', note: 'Resgate de produto', value: (value*-1)});

        res.json({
          message: 'Success',
          id: id,
          email: email,
          token: token,
          value: value,
          balance: new_balance,
      });
  
      }

});

module.exports = router;
