const express = require('express');
const { list } = require('../controllers/productController');
const { mp } = require('../controllers/indexController');
const router = express.Router();

/* GET home page. */
router
    .get('/', list)
    .get('/mp-index/:id', mp)

module.exports = router;