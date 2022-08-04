import { Router } from "express";
import userAuthentication from "./userAuthenticationRouter.js"

const router = Router();

router.use([userAuthentication]);

export default router;