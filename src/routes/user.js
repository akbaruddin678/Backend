import { Router } from "express";
import { loginUser, refreshAccessToken } from "../controllers/user.js";
import { verifyJWT } from "../middlewares/auth.js";

const router = Router();

router.route("/login").post(loginUser);

router.route("/login").post(loginUser);

//secured routes
// router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

export default router;
