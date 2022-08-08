import { userUrlsRepository } from "../repositories/userUrlsRepository.js";

export async function statusUserUrls(_req,res){
    const {userId}=res.locals;
    try{
        const existingUser = await userUrlsRepository.getUserById(userId);
        if(existingUser.length===0) return res.sendStatus(404);

        const userUrls = await userUrlsRepository.getUserInfoById(userId);
        
        return res.status(200).send(userUrls);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}
