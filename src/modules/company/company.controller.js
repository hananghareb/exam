import { Application } from "../../../Database/models/application.model.js";
import { Company } from "../../../Database/models/comapny.model.js";
import { Job } from "../../../Database/models/job.model.js";
import { catchError } from "../../middleware/catcherror.js";
import { AppError } from "../../utils/appError.js";


// add company
export const addcompany =catchError(async(req,res,next)=>{
  const{companyname,description,industry,address,numberofemployees,companyemail,company_HR} = req.body
  const checkexist = await Company.findOne({$or:[{companyname},{companyemail}]}) // null,object
  if(checkexist) return next(new AppError('company exist',409))

 const company = new Company({
  companyname,
  companyemail,
  description,
  industry,
  numberofemployees,
  address,
  company_HR:req.user._id
 })

await company.save()
res.status(201).json({message:" add company sucessfully",company})


})


// update company
export const updatecompany =catchError(async(req,res,next)=>{
  const {id} = req.params
  const{companyname,description,industry,address,numberofemployees,companyemail} = req.body
 
  const checkowner = await Company.findOne({_id:id,company_HR:req.user._id}) 
 if(!checkowner) return next(new AppError('not athorized',409))

 
  const checkexist = await Company.findOne({$or:[{companyemail},{companyname}]})
  if(checkexist) return next(new AppError('duplicate info',409))

    const update = await Company.updateOne({_id:id},req.body)
    if(!update) return next(new AppError('not found',404))

  res.status(200).json({message:"update successfully"})

})

// delete company
export const deletecompany =catchError(async(req,res,next)=>{
  const{id} = req.params
 const checkowner = await Company.findOne({_id:id,company_HR:req.user._id}) 
 if(!checkowner) return next(new AppError('not athorized',409))


    const deletecompany = await Company.deleteOne({_id:id})
    if(!deletecompany) return next(new AppError('not found',404))

  res.status(200).json({message:"delete successfully"})

})

// get company data
export const getcompanydata =catchError(async(req,res,next)=>{
  const {_id} = req.params

    const getcompany = await Company.findById({_id})
    if(!getcompany) return next(new AppError('not found',404))

      const jobs = await Job.find({addedBy:getcompany.company_HR})
  res.status(200).json({getcompany,jobs})

})

// search for company name
export const getcompanyname =catchError(async(req,res,next)=>{
  const {companyname} = req.body
    const getcompanyname = await Company.findOne({companyname})
    if(!getcompanyname) return next(new AppError('not found',404))

  res.status(200).json({message:" successfully" ,getcompanyname})


})


// get application for specefic job
export const getallapplication =catchError(async(req,res,next)=>{
  const{jobid} = req.params
  const userid = req.user._id
  const role = req.user.role


  const job = await Job.findById(jobid)
  if(!job) return next(new AppError('job not found',404))

if(job.addedBy?.toString() !== userid?.toString())
   return next(new AppError('not athorized',403))

const applications = await Application.find({jobid})
.populate('userid', '-_id' )
  
res.status(201).json({message:"sucessfully",applications})


})
