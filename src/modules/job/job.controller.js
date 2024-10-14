import { Application } from "../../../Database/models/application.model.js";
import { Company } from "../../../Database/models/comapny.model.js";
import { Job } from "../../../Database/models/job.model.js";
import { catchError } from "../../middleware/catcherror.js";
import { AppError } from "../../utils/appError.js";
import cloudinary from "../../utils/cloudinary.js";


// add job
export const addjob =catchError(async(req,res,next)=>{
  const{jobtitle,joblocation,workingtime,senioritylevel,jobdescription,technicalskills,softskills,addedBy} = req.body


 const job = new Job({
  jobtitle,
  joblocation,
  jobdescription,
  workingtime,
  senioritylevel,
  technicalskills,
  softskills,
  addedBy:req.user._id
 })

await job.save()
res.status(201).json({message:" add job sucessfully",job})


})


// update job
export const updatejob =catchError(async(req,res,next)=>{
  const{id} = req.params
  const{jobtitle,joblocation,workingtime,senioritylevel,jobdescription,technicalskills,softskills,addedBy} = req.body
 const checkowner = await Job.findOne({_id:id,addedBy:req.user._id}) 
 if(!checkowner) return next(new AppError('not athorized',409))

    const update = await Job.updateOne({_id:id},req.body)
    if(!update) return next(new AppError('not found',404))

  res.status(200).json({message:"update successfully"})

})

// delete job
export const deletejob =catchError(async(req,res,next)=>{
  const{id} = req.params
 const checkowner = await Job.findOne({_id:id,addedBy:req.user._id}) 
 if(!checkowner) return next(new AppError('not athorized',409))


    const deletejob= await Job.deleteOne({_id:id})
    if(!deletejob) return next(new AppError('not found',404))

  res.status(200).json({message:"delete successfully"})

})



// // get all jobs
export const getalljobs =catchError(async(req,res,next)=>{
    const getjobs = await Job.find()
    let results = []
    for(const job of getjobs){
      const company = await Company.find({company_HR:job.addedBy})
      const objjob = job.toObject()
      objjob.companies = company
      results.push(objjob)

    }
  res.status(200).json({message:" successfully" ,results})


})

// get all jobs for a specefic company
export const getalljobsspecefic =catchError(async(req,res,next)=>{
  const {companyname} = req.query
    const company = await Company.findOne({companyname})
    if(!company) return next(new AppError('company not found',404))

    const jobs = await Job.find({addedBy:company.company_HR})
  if(jobs.length==0){
     return next(new AppError('no jobs for this company',404))


  }
res.status(200).json({message:" successfully" ,jobs})


})

// get all jobs filter
export const getalljobsfilter =catchError(async(req,res,next)=>{
  const{jobtitle,joblocation,workingtime,senioritylevel,technicalskills} = req.query
   let query = {}


   if(workingtime){
    query.workingtime = workingtime
   }

   if(joblocation){
    query.joblocation = joblocation
   }

   if(senioritylevel){
    query.senioritylevel = senioritylevel
   }

   if(technicalskills){
    query.technicalskills = technicalskills
   }

   if(jobtitle){
    query.jobtitle = jobtitle
   }

    const jobs = await Job.find(query)

  if(jobs.length==0){
     return next(new AppError('no jobs match this filter',404))

  }

  
res.status(200).json({message:" successfully" ,jobs})


})


export const applytojob = catchError(async(req,res,next)=>{
  const {usersoftskills,usertechskills,jobid} = req.body
  const userid = req.user._id
  const job = await Job.find({_id:jobid})
  if(!job) return next(new AppError('no job found',404))
    const checkexist = await Application.findOne({userid,jobid})
  if(checkexist) return next(new AppError('your applied this job',409))

const {secure_url,public_id}= await
 cloudinary.uploader.upload(req.file.path,{
  folder:"exam/userresum"
 })

 const application = await Application
.create({usersoftskills,usertechskills
  ,userResume:{secure_url,public_id},userid,jobid})
  res.status(200).json({message:"sucess",application})

})
