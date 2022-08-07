import { Router } from "express";
import {signupValidation, signinValidation} from "../middlewares/userAuthenticationMiddleware.js";
import { signup, signin } from "../controllers/userAuthenticationController.js";

const router = Router();

router.post('/signup', signupValidation, signup);
router.post('/signin',signinValidation, signin)

export default router;