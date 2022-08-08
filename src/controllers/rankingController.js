import { rankingRepository } from "../repositories/rankingRepository.js";

export async function getRanking(_req,res){
    try{
        const ranking = await rankingRepository.generateRanking();
        if(ranking.length===0) return res.sendStatus(204);
        return res.status(200).send(ranking);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}