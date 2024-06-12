const express = require('express');
const { indexView } = require('../controllers/indexController');
const router = express.Router();

/* GET home page. */
router
    .get('/', indexView)

module.exports = router;