import { Router } from "express";
import userAuthentication from "./userAuthenticationRouter.js"
import urlsRouter from "./urlsRoutes.js";
import usersRoute from "./usersRoute.js"

const router = Router();

router.use([userAuthentication,urlsRouter,usersRoute]);

export default router;