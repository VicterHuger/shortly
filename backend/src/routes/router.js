import { Router } from "express";
import userAuthentication from "./userAuthenticationRouter.js"
import urlsRouter from "./urlsRoutes.js";

const router = Router();

router.use([userAuthentication,urlsRouter]);

export default router;