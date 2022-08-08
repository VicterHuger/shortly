import connection from "../database/postgres.js";

async function getUrlByUser(url,id){
    const {rows:urlOfUser}= await connection.query(`
        SELECT id FROM "shortUrls"
        WHERE url=$1 AND "userId"=$2`,
        [url,id]
    );
    return urlOfUser;
    
}

async function insertShortUrl(id,shortUrl,url){
    const {rowCount}= await connection.query(`
        INSERT INTO "shortUrls"
        ("userId","shortUrl",url)
        VALUES
        ($1,$2,$3)`
        ,[id, shortUrl, url]
    );
    return rowCount;
}

async function selectUrlById(id){
    const {rows:shortUrl} = await connection.query(`
        SELECT id, "shortUrl", url 
        FROM "shortUrls"
        WHERE id=$1`,[id]
    );
    return shortUrl;
}

async function selectShortUrlByShortUrl(shortUrl){
    const {rows:existingShortUrl} = await connection.query(`
        SELECT url 
        FROM "shortUrls"
        WHERE "shortUrl"=$1`,[shortUrl]
    );
    return existingShortUrl;
}

async function updateVisitCount(shortUrl){
    const {rowCount}= await connection.query(`
        UPDATE "shortUrls"
        SET "visitCount"="visitCount"+1
        WHERE "shortUrl"=$1`,[shortUrl]
    );
    return rowCount;
}

async function selectUserIdByShortUrlId(id){
    const {rows:shortUrlInfo} = await connection.query(`
        SELECT "userId" 
        FROM "shortUrls"
        WHERE id=$1`,[id]
    );

    return shortUrlInfo;
}

async function deleteShortUrlById(id){
    const {rowCount} = await connection.query(`
        DELETE FROM "shortUrls"
        WHERE id=$1`,[id]
    );
    return rowCount;
}

export const urlsRepository = {
    getUrlByUser,
    insertShortUrl,
    selectUrlById,
    selectShortUrlByShortUrl,
    updateVisitCount,
    selectUserIdByShortUrlId,
    deleteShortUrlById
}