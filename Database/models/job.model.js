import mongoose, { model, Schema, Types } from "mongoose";

const schema = new Schema({

    jobtitle :{
        type:String,
    },
    joblocation :{
        type:String,
        enum:['onsite','remotely','hybrid']
    },
    workingtime:{
        type:String,
        enum:['parttime','fulltime']
    },
    senioritylevel :{
        type:String,
        enum:['junior','mid-Level','senior','team-lead','cto']
    },
    jobdescription :{
        type:String,
        min:10,
        trim:true
        },

        technicalskills:[{
            type:String,
        }],
        softskills:[{
            type:String,

        }],

    addedBy:{
        type:Types.ObjectId,
        ref:'User'
        }
  

} ,{ timestamps:true, versionkey:false} )

export const Job = model('Job',schema) 