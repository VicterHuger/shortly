import connection from "../database/postgres.js";

async function getUserById(id){
    const {rows:existingUser} =await connection.query(`
    SELECT id FROM users WHERE id=$1`,[id]);
    return existingUser;
}

async function getUserInfoById(id){
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
        `,[id]);
        if(userUrls.length===0) {
            const {rows:userUrls}=await connection.query(`
                SELECT json_build_object(
                    'id', u.id,
                    'name', u.name,
                    'visitCount', 0,
                    'shortenedUrls', json_build_object( 
                    )
                ) AS result
                FROM users u 
                WHERE u.id=$1`,
                [id]
            );
            return userUrls[0].result;
        }
        return  userUrls[0].result;
}

export const userUrlsRepository ={
    getUserById,
    getUserInfoById
}