var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
let User = require('../models/User');
var passport = require('passport');



/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login Page' });
});


router.post('/', function(req, res, next) {
  console.log("TEST");
  passport.authenticate('local',{
     successRedirect: '/',
     failureRedirect: '/login',
     failureFlash: true
  })(req,res,next);
});
module.exports = router;
