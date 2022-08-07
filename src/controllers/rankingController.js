import connection from "../database/postgres.js";

export async function getRanking(_req,res){
    try{
        const {rows:ranking} = await connection.query( `
        SELECT u.id, u.name, COUNT(s."shortUrl") AS "linksCount", COALESCE(SUM(s."visitCount"),0) AS "visitCount"
        FROM users u
        LEFT JOIN "shortUrls" s
        ON u.id=s."userId"
        GROUP BY u.id
        ORDER BY "visitCount" DESC ,"linksCount" DESC
        LIMIT 10`);
        if(ranking.length===0) return res.sendStatus(204);
        return res.status(200).send(ranking);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}