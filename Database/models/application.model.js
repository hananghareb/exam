import mongoose, { model, Schema, Types } from "mongoose";

const schema = new Schema({
    jobid:{
        type:Types.ObjectId,
        required:true,
        ref:'Job'
    },
    userid:{
        type:Types.ObjectId,
        required:true,
        ref:'User'
    },
    usertechskills:[{
        type:String,
        required:true
    }],
    usersoftskills:[{
        type:String,
        required:true
    }],
    userResume:Object
    

} ,{ timestamps:true, versionkey:false} )



export const Application = model('Application',schema) 