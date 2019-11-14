const express = require('express');
const router = express.Router();

let jwt;

router.post('/callback', function (req, res) {
    jwt = req.body.access_token;
    res.json('ok')
});

router.get('/', function(req, res){
    res.render('index', {title: 'JWT Callback', jwt: jwt});
});

module.exports = router;
