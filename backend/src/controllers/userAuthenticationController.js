import bcrypt from 'bcrypt';
import connection from "../database/postgres.js";


async function signup(_req,res){
    const {name,email,password}=res.locals.body;
    try{
        const passwordHash = await bcrypt.hash(password, 10);
        const {rowCount}= await connection.query(`
        INSERT INTO users 
        (name, email, password)
        VALUES
        ($1,$2,$3)`,[name,email,passwordHash]);
        if(rowCount===1){
            return res.sendStatus(201);
        }
        return res.status(500).send('Error on sign up a new user!');

    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
}

export {signup}; 