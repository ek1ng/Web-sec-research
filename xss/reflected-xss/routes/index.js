var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(__dirname + "/index.html")
});
router.get('/xss',function (req,res){
  console.log("token =",req.query.token)
  return res.status(200)
})

module.exports = router;
