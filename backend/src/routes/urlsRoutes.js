import { Router } from "express";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { urlsBodyValidation , verifyShortUrlOwner} from "../middlewares/urlsMiddlewares.js";
import { getUrlById, shortUrlCretor, openUrlByShortUrl, deleteShortUrl} from "../controllers/urlsController.js";

const router=Router();

router.post('/urls/shorten',tokenValidation, urlsBodyValidation,shortUrlCretor );
router.get('/urls/:id',getUrlById); 
router.get('/urls/open/:shortUrl',openUrlByShortUrl);
router.delete('/urls/:id', tokenValidation, verifyShortUrlOwner, deleteShortUrl );

export default router;