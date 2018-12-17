var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
let User = require('../models/User');




// Register Form
router.get('/', function(req, res, next) {
  res.render('register' , { title: 'VidDeliveryApp' });
});


// Register process

router.post('/', function(req,res,next){

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password ;


  // we can do a check here, but for simplicity reasons let's not do it now


  let newUser = new User({

    username: username,
    email: email,
    password: password
  });

bcrypt.genSalt(10, function(err,salt){

     bcrypt.hash(newUser.password, salt, function(err, hash){
        if (err) {
          console.log(err);
        }
        newUser.password = hash ;
        newUser.save(function(err){
            if(err){
               console.log(err);
               return;
            }
            else{
              req.flash('success', 'You are now registered and can log in');
              res.redirect('/login') ;
            }

        });
     });
});

});

module.exports = router;
