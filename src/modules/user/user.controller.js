import { nanoid } from "nanoid";
import { User } from "../../../Database/models/user.model.js";
import { catchError } from "../../middleware/catcherror.js";
import { AppError } from "../../utils/appError.js";
import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'

// update account
export const updateaccount =catchError(async(req,res,next)=>{
  const{email,mobilenumber,recoveryemail,BOB,lastname,firstname} = req.body
  const checkexist = await User.findOne({$or:[{email},{mobilenumber}],_id:{$ne:req.user._id}})
  if(checkexist) return next(new AppError('duplicate info',409))
    const update = await User.updateOne({_id:req.user._id},req.body)
  res.status(200).json({message:"update successfully"})




})

//delete account

export const deleteaccount =catchError(async(req,res,next)=>{
  const checkowner = await User.findOne({_id:req.user._id})
  if(!checkowner) return next(new AppError('not authorized',409))
    const deleteaccount = await User.deleteOne({_id:req.user._id})
  res.status(200).json({message:"deleted successfully"})


})

//get user account data 
export const getuseraccount =catchError(async(req,res,next)=>{
  const checkowner = await User.findOne({_id:req.user._id})
  if(!checkowner) return next(new AppError('not authorized',409))
    const getaccount = await User.findById(req.user._id)
  res.status(200).json({message:" successfully" , getaccount})


})

//get profile data for another
export const getprofileaccount =catchError(async(req,res,next)=>{
  const {_id} = req.params
  const getaccount = await User.findById({_id}).select("-password")
  if(!getaccount) return next(new AppError('not found',404))

  res.status(200).json({message:" successfully" , getaccount})


})


export const updatepassword = catchError(async(req,res,next)=>{
  let {email,oldpassword,newpassword}= req.body
  let user = await User.findOne({email})

  if(user && bcrypt.compareSync(oldpassword,user.password)){
    newpassword = bcrypt.hashSync(newpassword,8)
      await User.findOneAndUpdate({email},{password:newpassword})
      res.status(200).json({message:"update password successfully"})

  }
    next(new AppError("email or password incorrect" , 401))
})

export const forgetpassword=catchError(async(req,res,next)=>{
  const {email} = req.body
  const otp = nanoid(7)
  await User.updateOne({email},{otp})
  res.json({message:"success",otp})

})


// reset password
export const resetpassword = catchError(async(req,res,next)=>{
  let {email,password,otp} = req.body
  const user = await User.findOne({email,otp})
  if(!user) return next(new AppError('email or otp incorrect'))
    password = bcrypt.hashSync(password,8)
  await User.updateOne({email},{password})
  res.json({message:"password change successfully"})
})


// get recovery email
export const recoveryemail = catchError(async(req,res,next)=>{
  const {recoveryemail} = req.body
  const users = await User.find({recoveryemail})
  if(!users) return next(new AppError('not found',404))
  res.json({message:"sucess",users})
})