import {nanoid} from 'nanoid';
import { stripHtml } from 'string-strip-html';
import { urlsRepository } from '../repositories/urlsRepository.js';

export async function shortUrlCreator(_req,res){
    const {userId}=res.locals;
    const {url}=res.locals.body;
    try{
        const shortUrl=nanoid();
        const rowCount= await urlsRepository.insertShortUrl(userId,shortUrl,url);
        if(rowCount===1) return res.status(201).send({shortUrl}); 
        return res.status(500).send('It was not possible to create a short URL');
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function getUrlById(_req,res){
    const {id}=res.locals;
    try{
        const shortUrl = await urlsRepository.selectUrlById(id);
        if(shortUrl.length===0) return res.sendStatus(404);
        return res.status(200).send(shortUrl[0]);
    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
}

export async function openUrlByShortUrl(req,res){
    if(typeof(req.params.shortUrl)!=='string') return res.status(404).send('Invalid shortUrl');
    const shortUrl=stripHtml(req.params.shortUrl)?.result.trim() || null;
    if(!shortUrl) return res.status(404).send('Invalid shortUrl');
    try{
        const existingShortUrl = await urlsRepository.selectShortUrlByShortUrl(shortUrl);
        
        if(existingShortUrl.length===0) return res.sendStatus(404);

        const rowCount = await urlsRepository.updateVisitCount(shortUrl);
        if(rowCount===0) return res.status(500).send('It was not possible to update the visitCount');
        return res.redirect(`${existingShortUrl[0].url}`);
        
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function deleteShortUrl(_req,res){
    const {userId}=res.locals;
    const idShortUrl=stripHtml(res.locals.id)?.result.trim()||null;
    if(!idShortUrl || typeof(Number(idShortUrl))!=='number') return res.status(404).send('Invalid id');
    try{
        
        const shortUrlInfo=await urlsRepository.selectUserIdByShortUrlId(idShortUrl);
        
        if(shortUrlInfo.length===0) return res.sendStatus(404);
        if(shortUrlInfo[0].userId===userId){
            const rowCount = await urlsRepository.deleteShortUrlById(idShortUrl);
            if(rowCount===1) return res.sendStatus(204);
            return res.status(500).send('It was not possible to delete the shortUrl')
        }
        return res.sendStatus(401);
    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
}