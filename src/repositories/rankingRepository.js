import connection from "../database/postgres.js";

async function generateRanking(){
    const {rows:ranking} = await connection.query( `
        SELECT u.id, u.name, COUNT(s."shortUrl") AS "linksCount", COALESCE(SUM(s."visitCount"),0) AS "visitCount"
        FROM users u
        LEFT JOIN "shortUrls" s
        ON u.id=s."userId"
        GROUP BY u.id
        ORDER BY "visitCount" DESC ,"linksCount" DESC
        LIMIT 10`);
    return ranking;
}

export const rankingRepository = {
    generateRanking
}