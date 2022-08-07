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

export async function verifyIdIsValid(req,res,next){
    try{
        if(typeof(req.params.id)!=='string'){
            return res.status(404).send('Invalid type of id!');
        }
        const id=stripHtml(req.params.id)?.result.trim()||null;
        if(!id || typeof(Number(id))!=='number'){
            return res.status(404).send('Invalid id!')
        }
        res.locals.id=id;
        next();
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function verifyShortUrlOwner(_req,res,next){
    try{
        const idShortUrl=stripHtml(res.locals.id)?.result.trim()||null;
        if(!idShortUrl || typeof(Number(idShortUrl))!=='number') return res.status(404).send('Invalid id'); 

        const {rows:shortUrlInfo} = await connection.query(`
        SELECT "userId" 
        FROM "shortUrls"
        WHERE id=$1 AND "userId"=$2`,[idShortUrl,]);
        
        if(shortUrlInfo.length===0) return res.sendStatus(404);
        if(shortUrlInfo[0].userId===userId){
            const {rowCount} = await connection.query(`
            DELETE FROM "shortUrls"
            WHERE id=$1`,[idShortUrl]);
            if(rowCount===1) return res.sendStatus(204);
            return res.status(500).send('It was not possible to delete the shortUrl')
        }
        return res.sendStatus(401);

        res.locals.idShortUrl=idShortUrl;
        next();
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}