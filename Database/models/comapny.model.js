import mongoose, { model, Types } from "mongoose";

const schema = new mongoose.Schema({
    companyname:{
        type:String,
        unique:true,
        lowercase:true,
        trim:true
    },

    description :{
        type:String,
        min:10,
        trim:true

        },

        industry :{
            type:String,
        },
        address:{
            type:String  
              },

        numberofemployees:{
            from:{
                type:String
            },
            to:{
                type:String
            },
        },

      companyemail:{
        type:String,
        unique:true,
        trim:true,
        lowercase:true
    },

    company_HR:{
        type:Types.ObjectId,
        ref:'User'
    }

},{timestamps:true,versionKey:false})

export const Company = model('Company',schema)