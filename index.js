import express from 'express'
import { dbconnection } from './Database/dbconnection.js'
import { bootstrap } from './src/modules/bootstrap.js'
import { globalerror } from './src/middleware/globalError.js'
import { AppError } from './src/utils/appError.js'
const app = express()
const port = 3000

app.use(express.json())

import dotenv from 'dotenv'
dotenv.config()

dbconnection()

bootstrap(app)  
app.use('*',(req,res,next)=>{
    next(new AppError(`route not found , ${req.originalUrl}`,404))
})
app.use(globalerror)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))