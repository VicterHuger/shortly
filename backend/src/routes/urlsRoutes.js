import { Router } from "express";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { urlsBodyValidation } from "../middlewares/urlsMiddlewares.js";
import { getUrlById, shortUrlCretor, openUrlByShortUrl } from "../controllers/urlsController.js";

const router=Router();

router.post('/urls/shorten',tokenValidation, urlsBodyValidation,shortUrlCretor );
router.get('/urls/:id',getUrlById); 
router.get('/urls/open/:shortUrl',openUrlByShortUrl)

export default router;