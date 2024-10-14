import Joi from "joi";

export const signupVal = Joi.object({
    firstname:Joi.string().required().min(2).max(10),
    lastname:Joi.string().required().min(2).max(10),
    email:Joi.string().email().required(),
    password:Joi.string().required().pattern(/^[A-Za-z0-9]{5,40}$/),
    recoveryemail:Joi.string().email().required(),
    DOB:Joi.string().required(),
    mobilenumber: Joi.string().min(2).max(14).required(),
    role:Joi.string().valid('user','company_HR').default('user'),
    status:Joi.string().valid('online','offline').default('offline')
})
export const signinVal = Joi.object({
    email:Joi.string().email(),
    password:Joi.string().pattern(/^[A-Za-z0-9]{5,40}$/).required(),
    recoveryemail:Joi.string().email(),
    mobilenumber: Joi.string().min(2).max(14),
})