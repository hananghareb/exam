import { Router } from "express"
import { validate } from "../../middleware/validate.js"
import { allowedto, protectedroutes } from "../auth/auth.controller.js"
import { addcompany, deletecompany, getallapplication, getcompanydata, getcompanyname, updatecompany } from "./company.controller.js"
import { addcompanyVal, deletecompanyVal, getallapplicationVal, getcompanynameVal, getcompanyVal, updatecompanyVal } from "./company.validation.js"

const companyrouter = Router()
companyrouter.post('/addcompany',protectedroutes,allowedto('company_HR'),validate(addcompanyVal),addcompany)
companyrouter.put('/:id',protectedroutes,allowedto('company_HR'),validate(updatecompanyVal),updatecompany)
companyrouter.delete('/:id',protectedroutes,allowedto('company_HR'),validate(deletecompanyVal),deletecompany)
companyrouter.get('/:_id',protectedroutes,allowedto('company_HR'),validate(getcompanyVal),getcompanydata)
companyrouter.get('/',protectedroutes,allowedto('company_HR','user'),validate(getcompanynameVal),getcompanyname)
companyrouter.get('/application/:jobid',protectedroutes,
    allowedto('company_HR'),validate(getallapplicationVal),
    getallapplication)


export default companyrouter