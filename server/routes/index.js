var express = require('express');
var router = express.Router();

// const io = require('../app')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/start',function(req, res, next) {
  // console.log(req.params.count);
  const io = req.app.get('socketio');
  io.emit('start')
  res.json({msg:'success'})
})

router.get('/count/:count', function(req, res, next) {
  // console.log(req.params.count);
  const io = req.app.get('socketio');
  io.emit('count',req.params.count)
  res.json({msg:'success'})
});


router.get('/timeout', function(req, res, next) {
  // console.log(req.params.count);
  const io = req.app.get('socketio');
  io.emit('timeout')
  res.json({msg:'success'})
});


module.exports = router;
