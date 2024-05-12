const express = require('express');
const { index, admin } = require('../controllers/indexController');
const router = express.Router();

/* GET home page. */
router
    .get('/', index)
    .get('/admin', admin)

module.exports = router;