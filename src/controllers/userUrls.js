import connection from "../database/postgres.js";

export async function statusUserUrls(_req,res){
    const {userId}=res.locals;
    try{
        const {rows:existingUser} =await connection.query(`
        SELECT id FROM users`);
        if(existingUser.length===0) return res.sendStatus(404);
        const {rows:userUrls} = await connection.query(`
            SELECT json_build_object(
                'id', u.id,
                'name', u.name,
                'visitCount', (SELECT SUM(s."visitCount") FROM "shortUrls" s WHERE s."userId"=$1),
                'shortenedUrls', (SELECT JSON_AGG(ROW_TO_JSON(su)) 
                    FROM(
                     SELECT s.id, s."shortUrl", s.url, s."visitCount" FROM "shortUrls" s
                     JOIN users u
                     ON u.id=s."userId"
                     WHERE u.id=$1  
                    ) su 
                )
            ) AS result
            FROM users u
            JOIN "shortUrls" s
            ON s."userId"=u.id
            WHERE u.id=$1
            GROUP BY u.id, u.name, s.id
        `,[userId]);
        if(userUrls.length===0) {
            const {rows:userNoUrl}=await connection.query(`
                SELECT json_build_object(
                    'id', u.id,
                    'name', u.name,
                    'visitCount', 0,
                    'shortenedUrls', json_build_object( 
                    )
                ) AS result
                FROM users u 
                WHERE u.id=$1`,
                [userId]
            );
            return res.status(200).send(userNoUrl[0].result);
        }
        return res.status(200).send(userUrls[0].result);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

// '"shortenedUrls"', (SELECT json_agg(row_to_json ("shortUrls")) FROM (SELECT s.id, s."shortUrl", s.url, s."visitCount") "shortUrls" s
//json_agg(row_to_json(short)) FROM (
//    SELECT s.id, s."shortUrl", s.url, s."visitCount" FROM "shortUrls" s) short 