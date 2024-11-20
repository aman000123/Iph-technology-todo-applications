import Joi from 'joi';

export const User_Schema = () => {
    const schema = Joi.object({
        name: Joi.string(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).optional(),
        mobile: Joi.string(),

    });

    return schema;
};


export const LoginSchema = () => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    return schema;
};