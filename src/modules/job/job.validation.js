import Joi from "joi";

export const addjobVal = Joi.object({
    jobtitle:Joi.string().min(2).max(10),
    joblocation:Joi.string().min(2).max(100).valid('onsite','remotely','hybrid'),
    workingtime:Joi.string().valid('parttime','fulltime'),
    senioritylevel:Joi.string().valid('junior','mid-Level','senior','team-lead','cto'),
    jobdescription:Joi.string(),
    technicalskills: Joi.string(),
    softskills:Joi.string(),
    addedBy:Joi.string().hex().length(24)
})

export const updatejobVal = Joi.object({
    jobtitle:Joi.string().min(2).max(10),
    joblocation:Joi.string().min(2).max(100).valid('onsite','remotely','hybrid'),
    workingtime:Joi.string().valid('parttime','fulltime'),
    senioritylevel:Joi.string().valid('junior','mid-Level','senior','team-lead','cto'),
    jobdescription:Joi.string(),
    technicalskills: Joi.string(),
    softskills:Joi.string(),
    addedBy:Joi.string().hex().length(24),
    id:Joi.string().hex().length(24)

})

export const deletejobVal = Joi.object({
     id:Joi.string().hex().length(24)

})


export const getspeceficjobVal = Joi.object({
    companyname:Joi.string().min(2).max(10)

})


export const getjobsfilterVal = Joi.object({
    jobtitle:Joi.string().min(2).max(10),
    joblocation:Joi.string().min(2).max(100).valid('onsite','remotely','hybrid'),
    workingtime:Joi.string().valid('parttime','fulltime'),
    senioritylevel:Joi.string().valid('junior','mid-Level','senior','team-lead','cto'),
    technicalskills: Joi.string(),

})

export const applytojobVal = Joi.object({
    jobid:Joi.string().hex().length(24),
    usertechskills: Joi.string(),
    usersoftskills:Joi.string(),

})