import bcrypt from 'bcrypt'
import { User } from "../../../Database/models/user.model.js";
import { catchError } from "../../middleware/catcherror.js";
import { AppError } from "../../utils/appError.js";
import jwt from 'jsonwebtoken'

// signup
export const signup = catchError(async(req,res,next)=>{
    const{firstname,lastname,email,password,recoveryemail,DOB,mobilenumber,role,status} = req.body
    const checkexist = await User.findOne({$or:[{email},{mobilenumber}]}) // null,object
    if(checkexist) return next(new AppError('duplicate user',409))

   const hashpassword = bcrypt.hashSync(password,8)
   const user = new User({
    firstname,
    lastname,
    email,
    password:hashpassword,
    recoveryemail,
    DOB,
    mobilenumber,
    role,
    status
   })

  await user.save()
  res.status(201).json({message:" add user sucessfully",user})


})

// signin
export const signin = catchError(async(req,res,next)=>{
    const{email,password,recoveryemail,mobilenumber} = req.body
    const checkexist = await User.findOne({$or:[{email},{mobilenumber},{recoveryemail}]}) // null,object
    if(!checkexist) return next(new AppError('user not found',404))

    const checkpassword = bcrypt.compareSync(password,checkexist.password) 
    if(!checkpassword) return next(new AppError('email or password incorrect',409))
    
   await User.updateOne({_id:checkexist._id},{status:"online"})

   let token = jwt.sign({userid:checkexist._id,role:checkexist.role},process.env.JWT_KEY)

  res.status(201).json({message:"login successfully",token})


})

export const protectedroutes= catchError(async(req,res,next)=>{
    let {token} = req.headers
    let userpayload = null
    if(!token) return next(new AppError('token not provided' , 401))
  
      jwt.verify(token,process.env.JWT_KEY,(err,payload)=>{
        if(err) return next(new AppError(err , 401))
          userpayload = payload
      })
       let user = await User.findById(userpayload.userid)
       if(!user)  return next(new AppError('user not found' , 401))

        req.user = user
          next()
  
  })

export const allowedto= (...roles)=>{
    return catchError(async(req,res,next) =>{
      if(roles.includes(req.user.role)){
        return next()}
  
      return next(new AppError("you not authorized to access this endpoint",401))
    })
  }