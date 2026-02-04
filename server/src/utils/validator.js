const Joi = require('joi');
const AppError = require('./appError');

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        const message = error.details.map((detail) => detail.message).join(', ');
        return next(new AppError(message, 400));
    }
    next();
};

const authSchemas = {
    signup: Joi.object({
        name: Joi.string().required().min(2).max(50),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8),
        passwordConfirm: Joi.string().required().valid(Joi.ref('password'))
            .messages({ 'any.only': 'Passwords do not match' })
    }),
    login: Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
};

module.exports = {
    validate,
    authSchemas
};
