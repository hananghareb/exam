import jwt, { decode } from 'jsonwebtoken'
import { catchError } from './catcherror.js'
import { AppError } from '../utilts/appError.js'

export const verifytoken =  catchError(async(req,res,next)=>{


    let{token} = req.headers
    jwt.verify(token,process.env.JWT_KEY,async(err,decoded)=>{
 
       if(err) return next(new AppError('invaild token',401))
        next()
})

}
)