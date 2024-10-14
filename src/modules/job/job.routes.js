import { Router } from "express"
import { validate } from "../../middleware/validate.js"
import { allowedto, protectedroutes } from "../auth/auth.controller.js"
import { addjob, applytojob, deletejob, getalljobs, getalljobsfilter, getalljobsspecefic, updatejob } from "./job.controller.js"
import { addjobVal, applytojobVal, deletejobVal, getjobsfilterVal, getspeceficjobVal, updatejobVal } from "./job.validation.js"
import { filteration, uploadfile } from "../../utils/multer.js"

const jobrouter = Router()
jobrouter.post('/addjob',protectedroutes,allowedto('company_HR'),validate(addjobVal),addjob)
jobrouter.put('/:id',protectedroutes,allowedto('company_HR'),validate(updatejobVal),updatejob)
jobrouter.delete('/:id',protectedroutes,allowedto('company_HR'),validate(deletejobVal),deletejob)
jobrouter.get('/',protectedroutes,allowedto('company_HR','user'),getalljobs)
jobrouter.get('/specefic',protectedroutes,allowedto('company_HR','user'),validate(getspeceficjobVal),getalljobsspecefic)
jobrouter.get('/filter',protectedroutes,allowedto('company_HR','user'),validate(getjobsfilterVal),getalljobsfilter)
jobrouter.post('/apply',uploadfile(filteration.file).single("pdf"),
protectedroutes,allowedto('user'),validate(applytojobVal),
applytojob)


export default jobrouter