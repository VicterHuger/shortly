import { Router } from "express";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { urlsBodyValidation , verifyIdIsValid } from "../middlewares/urlsMiddlewares.js";
import { getUrlById, shortUrlCretor, openUrlByShortUrl, deleteShortUrl} from "../controllers/urlsController.js";

const router=Router();

router.post('/urls/shorten',tokenValidation, urlsBodyValidation, shortUrlCretor );
router.get('/urls/:id', verifyIdIsValid, getUrlById); 
router.get('/urls/open/:shortUrl', openUrlByShortUrl);
router.delete('/urls/:id', tokenValidation, verifyIdIsValid, deleteShortUrl );

export default router;