import { catchError } from "../../middleware/catcherror.js";
import { AppError } from "../../utils/appError.js";
import { Company } from '../../../Database/models/comapny.model.js';
import { Job } from '../../../Database/models/job.model.js';
import { Application } from '../../../Database/models/application.model.js';
import ExcelJs from 'exceljs'


// bonus
 export const excelsheet = catchError(async(req,res,next)=>{
  const company = await Company.findById(req.params.id)
  const jobs = await Job.find({addedBy:company.company_HR})

  let applications = []
  for(let job of jobs){
    let application = await Application.find({jobid:job._id})
    .populate("userid jobid")
    applications.push(application)

  }

  const workbook = new ExcelJs.Workbook()
  const worksheet = workbook.addWorksheet("sheet1")
  worksheet.columns = [
    {header :"user name",key:"user",width:20},
    {header :"resume link",key:"resume",width:100},
    {header :"job applied to",key:"job",width:20}

  ]
let data = []
for(const inApplication of applications){
  for(const application of inApplication){
    let dataentry = {user:application.userid.username,
      resume:application.userResume,
      job:application.jobid.jobtitle
    }
    data.push(dataentry)
  }
}

worksheet.addRows(data)
await workbook.xlsx.writeFile("sheet1.xlsx").catch((error)=>{
  console.log(error);
  
})
return res.json({applications})

})
