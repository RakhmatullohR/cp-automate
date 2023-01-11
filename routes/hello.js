const express = require('express');
var router = express.Router();

router.get('/', async function (req, res, next) {
  return await res.json('Hello world');
});
