import { Router } from "express";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { statusUserUrls } from "../controllers/userUrlsController.js"

const router=Router();

router.get('/users/me',tokenValidation, statusUserUrls )


export default router;