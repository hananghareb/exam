import { Router } from "express"
import { deleteaccount, forgetpassword, getprofileaccount, getuseraccount, recoveryemail, resetpassword, updateaccount, updatepassword } from "./user.controller.js"
import { validate } from "../../middleware/validate.js"
import { allowedto, protectedroutes } from "../auth/auth.controller.js"
import {  forgetpasswordVal, getprofileaccountVal, getrecoveryemailVal, resetpasswordVal, updateaccountVal, updatepasswordVal } from "./user.validation.js"

const userrouter = Router()
userrouter.put('/',protectedroutes,allowedto('user'),validate(updateaccountVal),updateaccount)
userrouter.delete('/',protectedroutes,allowedto('user','company_HR'),deleteaccount)
userrouter.get('/',protectedroutes,allowedto('user','company_HR'),getuseraccount)
userrouter.get('/recoveryemail',validate(getrecoveryemailVal),recoveryemail)
userrouter.get('/:_id',validate(getprofileaccountVal),getprofileaccount)
userrouter.patch('/',protectedroutes,allowedto('user','company_HR'),validate(updatepasswordVal),updatepassword)
userrouter.post('/',validate(forgetpasswordVal),forgetpassword)
userrouter.post('/resetpassword',validate(resetpasswordVal),resetpassword)



export default userrouter