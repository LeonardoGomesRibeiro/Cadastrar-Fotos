var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/cadastrar-foto', function (req, res) {
	res.send('cadastrar');
});

module.exports = router;
