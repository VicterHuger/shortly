import joi from 'joi';

const urlsBodySchema= joi.object({
    url: joi.string().uri().required()
});

export {urlsBodySchema};