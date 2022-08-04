import { Router } from "express";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { urlsBodyValidation } from "../middlewares/urlsMiddlewares.js";
import { getUrlById, shortUrlCretor } from "../controllers/urlsController.js";

const router=Router();

router.post('/urls/shorten',tokenValidation, urlsBodyValidation,shortUrlCretor );
router.get('/urls/:id',getUrlById); 

export default router;