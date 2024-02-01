const express = require("express");
const router = express.Router();
const { signUp, login, logout } = require("../controllers/userControllers");

router.post("/auth/signup", signUp);
router.post("/auth/signin", login);
router.post("/auth/logout", logout);

module.exports = router;
