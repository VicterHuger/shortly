import joi from 'joi';

const signupSchema = joi.object({
    name: joi.string().required().min(3).max(150),
    email: joi.string().email().max(255).required(),
    password:joi.string().pattern(/(?=.*?[A-Z])/).pattern(/(?=.*?[a-z])/).pattern(/(?=.*?[0-9])/).pattern(/(?=.*?[#?!@$%^&*-])/).min(8).required(),
    confirmPassword: joi.valid(joi.ref('password')).required(),
});

const signinSchema = joi.object({
    email: joi.string().email().max(255).required(),
    password: joi.string().required(),
});

export  {signupSchema,signinSchema};