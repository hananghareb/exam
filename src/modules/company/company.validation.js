import Joi from "joi";

export const addcompanyVal = Joi.object({
    companyname:Joi.string().min(2).max(10),
    description:Joi.string().min(2).max(100),
    industry:Joi.string(),
    address:Joi.string(),
    companyemail:Joi.string().email(),
    numberofemployees: Joi.object({
        from:Joi.number().min(11),
        to:Joi.number().max(20)

    }),
})

export const updatecompanyVal = Joi.object({
    companyname:Joi.string().min(2).max(10),
    description:Joi.string().min(2).max(100),
    industry:Joi.string(),
    address:Joi.string(),
    companyemail:Joi.string().email(),
    numberofemployees: Joi.object({
        from:Joi.number().min(11),
        to:Joi.number().max(20)
    }),
     id:Joi.string().hex().length(24)

})

export const deletecompanyVal = Joi.object({
     id:Joi.string().hex().length(24)

})
export const getcompanyVal = Joi.object({
    _id:Joi.string().hex().length(24)

})
export const getcompanynameVal = Joi.object({
    companyname:Joi.string().min(2).max(10)

})

export const getallapplicationVal  = Joi.object({
    jobid:Joi.string().hex().length(24).required(),
    userid:Joi.string().hex().length(24).required(),

})

