import jwt from 'jsonwebtoken';

export async function tokenValidation(req,res,next){
    try{
        const token=req.headers.authorization?.replace('Bearer ','');
        if(!token || token.length===0) return res.sendStatus(401);
        try{
            const userId=jwt.verify(token, process.env.JWT_SECRET);
            res.locals.userId=userId.id;
            next();
        }catch(err){
            console.log(err);
            return res.status(401).send('Invalid token! Log in again or verify your token!');
        }
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
   
}

