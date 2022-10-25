var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/info',function (req,res) {
  name = req.query.name
  console.log(name)
  res.json('Hello, ' + name)
})

module.exports = router;
