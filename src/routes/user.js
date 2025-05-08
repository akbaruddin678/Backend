const express = require("express");
const { loginUser, refreshAccessToken } = require("../controllers/user");
const { verifyJWT } = require("../middlewares/auth");

const router = express.Router();

// Login route
router.route("/login").post(loginUser);

// Secured routes
// router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

module.exports = router;
