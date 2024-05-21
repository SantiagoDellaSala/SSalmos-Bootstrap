const express = require('express');
const { list, admin } = require('../controllers/productController');
const router = express.Router();

/* GET home page. */
router
    .get('/', list)
    .get('/admin', admin)

module.exports = router;