import { Router } from "express";
import userAuthentication from "./userAuthenticationRouter.js"
import urlsRouter from "./urlsRoutes.js";
import usersRoute from "./usersRoute.js"
import rankingRoute from "./rankingRoute.js";

const router = Router();

router.use([userAuthentication,urlsRouter,usersRoute,rankingRoute]);

export default router;