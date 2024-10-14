const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { cart, addToCart, removeFromCart, updateCart } = require('../controllers/shoppingCartController')

router 
.get("/shopping-cart", authMiddleware, cart)
.post("/:userId/add-to-cart", authMiddleware, addToCart)
.post("/remove-from-cart", authMiddleware, removeFromCart)
.post("/update-cart", authMiddleware, updateCart);

module.exports = router;