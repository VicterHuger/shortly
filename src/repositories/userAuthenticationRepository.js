import connection from "../database/postgres.js";

async function userEmailValidation(email){
    const {rows:searchEmail} = await connection.query(`SELECT id,password FROM users WHERE email=$1`,[email]);

    return searchEmail;
}

async function insertUser(name,email,password){
    const {rowCount}= await connection.query(`
        INSERT INTO users 
        (name, email, password)
        VALUES
        ($1,$2,$3)`,[name,email,password]);
    return rowCount;
}

export const userAuthenticationRepository = {
    userEmailValidation,
    insertUser
}