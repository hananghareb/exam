import authrouter from "./auth/auth.router.js"
import bonusrouter from "./bonus/bonus.router.js"
import companyrouter from "./company/company.routes.js"
import jobrouter from "./job/job.routes.js"
import userrouter from "./user/user.routes.js"

export const bootstrap = (app) =>{
   
app.use('/auth',authrouter)
app.use('/users',userrouter)
app.use('/companies',companyrouter)
app.use('/jobs',jobrouter)
app.use('/excelsheet',bonusrouter)




    
}
