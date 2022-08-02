import express,{json} from 'express';
import cors from 'cors';

import router from './routes/router.js';
import connection from './database/postgres.js';



const app=express();

app.use[cors(), json(), router];

const PORT = process.env.PORT || 4001;

try{
    const test= await connection.query('SELECT * FROM users');
    console.log(test);
}catch(err){
    console.log(err);
}


app.listen(PORT, console.log(`Server listening on ${PORT} port`));