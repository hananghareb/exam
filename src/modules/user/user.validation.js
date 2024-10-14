import Joi from "joi";

export const updateaccountVal = Joi.object({
    firstname:Joi.string().min(2).max(10),
    lastname:Joi.string().min(2).max(10),
    email:Joi.string().email(),
    recoveryemail:Joi.string().email(),
    DOB:Joi.string(),
    mobilenumber: Joi.string().min(2).max(14)
})

export const forgetpasswordVal = Joi.object({
    email:Joi.string().email(),


})

export const resetpasswordVal = Joi.object({
    email:Joi.string().email(),
    password:Joi.string().required().pattern(/^[A-Za-z0-9]{5,40}$/),


})

export const updatepasswordVal = Joi.object({
    oldpassword:Joi.string().required().pattern(/^[A-Za-z0-9]{5,40}$/),
    newpassword:Joi.string().required().pattern(/^[A-Za-z0-9]{5,40}$/),
    email:Joi.string().email(),

})

export const getprofileaccountVal = Joi.object({
    _id:Joi.string().hex().length(24).required()

})

export const getrecoveryemailVal = Joi.object({
    recoveryemail:Joi.string().email(),

})

