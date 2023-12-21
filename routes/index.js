var express = require('express');
var router = express.Router();

const messages = [
  {
    text: 'Hi there!',
    user: 'Boris',
    added: new Date(),
  },
  {
    text: 'We are!',
    user: 'Luffy',
    added: new Date(),
  },
];

/* GET home page. */
router.get('/', function (req, res, next) {
  req.app.locals['datefns'] = require('date-fns');
  res.render('index', {
    title: 'Mini Message Board',
    messages,
  });
});

/* GET new message page */
router.get('/new', function (req, res, next) {
  res.render('form', { title: 'Add a new message' });
});

/* POST new message */
router.post('/new', function (req, res, next) {
  messages.push({
    user: req.body.name,
    text: req.body.message,
    added: new Date(),
  });
  res.redirect('/');
});

module.exports = router;
