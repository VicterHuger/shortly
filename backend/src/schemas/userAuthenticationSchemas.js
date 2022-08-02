import joi from 'joi';

const signupSchema = joi.object({
    name: joi.string().required().min(3),
    email: joi.string().email().required(),
    password:joi.string().pattern(/(?=.*?[A-Z])/).pattern(/(?=.*?[a-z])/).pattern(/(?=.*?[0-9])/).pattern(/(?=.*?[#?!@$%^&*-])/).min(8).required(),
    confirmPassword: joi.string().ref()
});

export  {signupSchema};