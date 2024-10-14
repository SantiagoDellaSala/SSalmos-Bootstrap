const express = require('express');
const checkAdminRole = require("../middlewares/checkAdminRole");
const authMiddleware = require("../middlewares/authMiddleware");
const { indexView, admin, searchUser, terminosCondiciones, nosotros, } = require('../controllers/indexController');
const router = express.Router();

/* GET home page. */
router
    .get('/', indexView)
    .get("/admin", authMiddleware, checkAdminRole, admin)
    .get("/search", searchUser)
    .get("/terminos-y-condiciones", terminosCondiciones)
    .get("/nosotros", nosotros);

module.exports = router;