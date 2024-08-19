var express = require('express');
var router = express.Router();
const queries = require('../db/queries');

/* GET home page. */
router.get('/', async function (req, res, next) {
  req.app.locals['datefns'] = require('date-fns');
  const dbMessages = await queries.getAllMessages();
  console.log(dbMessages);
  res.render('index', {
    title: 'Mini Message Board',
    messages: dbMessages,
  });
});

/* GET new message page */
router.get('/new', function (req, res, next) {
  res.render('form', { title: 'Add a new message' });
});

/* POST new message */
router.post('/new', async function (req, res, next) {
  await queries.addMessage(req.body.name, req.body.message);

  res.redirect('/');
});

module.exports = router;
