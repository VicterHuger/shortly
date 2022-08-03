import { Router } from "express";
import signupValidation from "../middlewares/userAuthenticationMiddleware.js";
import { signup } from "../controllers/userAuthenticationController.js";

const router = Router();

router.post('/signup', signupValidation, signup);

export default router;