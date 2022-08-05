import { stripHtml } from "string-strip-html";
import bcrypt from 'bcrypt';
import connection from '../database/postgres.js';
import {signupSchema,signinSchema} from '../schemas/userAuthenticationSchemas.js';

async function signupValidation(req, res, next) {
    const body = req.body;
    try {
        for(const key of Object.keys(body) ){
            body[key]=stripHtml(body[key]).result.trim();
        };

        const {error} = signupSchema.validate(body,{abortEarly:false});
        
        let message= errorUserAuthValidation(error);

        if(message) return res.status(422).send(message);

        const {rows:searchEmail} = await connection.query(`SELECT email FROM users WHERE email=$1`,[body.email]);
        if (searchEmail.length>0) {
            return res.status(409).send('Email already registered!');
        }

        res.locals.body=body;

        next();

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

async function signinValidation(req,res,next){
    const {body}=req;
    try{
        for (const key of Object.keys(body)){
            body[key]=stripHtml(body[key]).result.trim();
        }

        const {error} = signinSchema.validate(body,{abortEarly:false});
            
        let message= errorUserAuthValidation(error);
    
        if(message) return res.status(422).send(message);

        const {rows:user} = await connection.query(`
        SELECT id,password from users WHERE email=$1`,[body.email]);

        if(user.length===0) res.status(401).send('Invalid email or password.');

        const hashCheck = await bcrypt.compare(body.password, user[0].password);
        if (!hashCheck)  return res.status(401).send('Invalid email or password.');

        delete user[0].password;
        
        res.locals.user = user[0]; 
        
        next();


    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

function errorUserAuthValidation(error){
    if (error) {
        const errorMessages=error.details.map(item=>item.message);
        let message='';
        errorMessages.forEach(err=>{
            if((/\"name\" is required/).test(err)){
                return message+='Name field is required!\n';
            }
            if(err.includes('"name" is not allowed to be empty')){
                return message+='Name field is not allowed to be empty!\n';
            }
            if(err.includes('"name" length must be at least 3 characters long')){
                return message+='Name length must be at least 3 characters long!\n';
            }
            if((/\"email\" is required/).test(err)){
                return message+='Email field is required!\n';
            }
            if(err.includes('"email" is not allowed to be empty')){
                return message+='Email field is not allowed to be empty\n';
            }
            if((/\"password\" is required/).test(err)){
                return message+='Password field is required!\n';
            }
            if(err.includes('"password" is not allowed to be empty')){
                return message+='Password field is not allowed to be empty!\n';
            }
            if((/\"email" must be a valid email/).test(err)){
                return message+='Email must be a valid email!\n';
            }
            if(err.includes("/(?=.*?[A-Z])/")){
                return message+='Password must contain at least 1 capital character!\n';
            }
            if(err.includes("/(?=.*?[a-z])/")){
                return message+='Password must contain at least 1 lower case character!\n';
            }
            if(err.includes("/(?=.*?[0-9])/")){
                return message+='Password must contain at least 1 number!\n';
            }
            if(err.includes('/(?=.*?[#?!@$%^&*-])/')){
                return message+='Password must contain at least 1 special character!\n';
            }
            if(err.includes('"password" length must be at least 8 characters long')){
                return message+='Password must contain at least 8 characters long\n';
            }else{
                return message+=err+'\n';
            }
        });
        return message;
    }
    return null;
}

export {signupValidation, signinValidation};