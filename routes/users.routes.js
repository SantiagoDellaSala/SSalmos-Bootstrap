const express = require("express");
const {
  login,
  editUser,
  updateUser,
  profile,
  deleteUser,
  cart,
  renderRegister,
  register,
  logout,
  loginn,
  admin,
  searchUser,
  addToCart,
  removeFromCart,
  updateCart,
  viewCart,
  terminosCondiciones,
  nosotros
} = require("../controllers/userController");

const registerValidator = require("../validations/registerValidator");
const loginValidator = require("../validations/loginValidator");
const authMiddleware = require("../middlewares/authMiddleware");
const checkAdminRole = require("../middlewares/checkAdminRole");
const validationMiddleware = require("../middlewares/validationMiddleware");
const { shipmentForm } = require("../controllers/productController");

const router = express.Router();

/* /users */
router
  .get("/register", renderRegister)
  .post("/register", registerValidator, validationMiddleware, register)
  .get("/login", loginn)
  .post("/login", loginValidator, validationMiddleware, login)
  .get("/logout", logout)
  .get("/admin", authMiddleware, checkAdminRole, admin)
  .get("/:id/edit", authMiddleware, editUser)
  .post("/:id/edit", authMiddleware, updateUser)
  .get("/:id/profile", authMiddleware, profile)
  .get("/:id/delete", authMiddleware, deleteUser)
  .get("/search", searchUser)
  .get("/shopping-cart", authMiddleware, cart)
  .get("/view-cart", authMiddleware, viewCart)
  .post("/:userId/add-to-cart", authMiddleware, addToCart)
  .post("/remove-from-cart", authMiddleware, removeFromCart)
  .post("/update-cart", authMiddleware, updateCart)
  .get('/formulario-envio', shipmentForm)
  .get('/terminos-y-condiciones', terminosCondiciones)
  .get('/nosotros', nosotros)

module.exports = router;