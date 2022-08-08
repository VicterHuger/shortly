import { stripHtml } from "string-strip-html";
import { urlsBodySchema } from "../schemas/urlsBody.js";
import { urlsRepository } from "../repositories/urlsRepository.js";


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
        
        const urlRegistered = await urlsRepository.getUrlByUser(body.url,userId);

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
