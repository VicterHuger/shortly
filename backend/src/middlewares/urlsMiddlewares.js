import { stripHtml } from "string-strip-html";
import connection from "../database/postgres.js";
import { urlsBodySchema } from "../schemas/urlsBody.js";


export async function urlsBodyValidation(req,res,next){
    const body = req.body;
    const {userId}=res.locals;
    try {
        for(const key of Object.keys(body) ){
            body[key]=stripHtml(body[key]).result.trim();
        };

        const {error} = urlsBodySchema.validate(body,{abortEarly:false});
        let message='';
        if(error){
            const errorMessages=error.details.map(item=>item.message);
            
            errorMessages.forEach(err=>{message+=`${err}\n`});
            return res.status(422).send(message);
        }
        
        const {rows:urlRegistered}= await connection.query(`
        SELECT id FROM "shortUrls"
        WHERE url=$1 AND "userId"=$2`,[body.url,userId]);
        if(urlRegistered.length>0) return res.status(404).send('You have already registered a shortUrl to this url!');

        res.locals.body=body;

        next();

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

export async function verifyShortUrlOwner(req,res,next){
    try{
        const idShortUrl=stripHtml(req.params.id).result.trim()||null;
        if(!idShortUrl || typeof(Number(idShortUrl))!=='number') return res.status(404).send('Invalid id'); 
        res.locals.idShortUrl=idShortUrl;
        next();
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}