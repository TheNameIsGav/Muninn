var express = require('express');
const res = require('express/lib/response');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('about', {
        title: 'About',
        name: 'Bucky'
    });
});

module.exports = router;