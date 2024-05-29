const express = require('express');
const { list } = require('../controllers/productController');
const router = express.Router();

/* GET home page. */
router
    .get('/', list)

module.exports = router;