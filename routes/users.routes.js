const express = require("express");
const {
  login,
  editUser,
  updateUser,
  profile,
  deleteUser,
  renderRegister,
  register,
  logout,
  loginn,
} = require("../controllers/userController");

const registerValidator = require("../validations/registerValidator");
const loginValidator = require("../validations/loginValidator");
const authMiddleware = require("../middlewares/authMiddleware");
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
  .get("/:id/edit", authMiddleware, editUser)
  .post("/:id/edit", authMiddleware, updateUser)
  .get("/:id/profile", authMiddleware, profile)
  .get("/:id/delete", authMiddleware, deleteUser)
  .get("/formulario-envio", shipmentForm)

module.exports = router;