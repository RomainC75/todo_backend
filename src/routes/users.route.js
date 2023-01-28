var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.render('signup',{
    title:'Signup',

  });
})

router.post('/signup', function(req, res, next) {
  console.log(req.body)
  res.send('respond with a resource');
})



module.exports = router;
