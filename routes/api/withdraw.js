var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/withdraw', function(req, res, next) {
    const id = req.body.id;
    const balance = req.body.balance;
    const value = req.body.value;
    res.json({
        message: 'Success',
        id: id,
        balance: balance,
        value: value
    });

});

module.exports = router;
