var db = require('../libs/db')
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/info',async function (req,res){
  const {userid} = req.query;
  console.log(userid)
  try {
    const userInfo = await db.getUserInfo(userid);
    return res.json(userInfo);
  } catch (e) {
    res.status(500).json({ msg: "internal server error" });
  }
})
module.exports = router;
