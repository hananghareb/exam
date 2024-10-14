import mongoose, { model, Schema } from "mongoose";
const schema = new Schema({
    firstname:{
        type:String,
        trim:true,
        minLength:[2,'to short firstname']
    },
    lastname:{
        type:String,
        trim:true,
        minLength:[2,'to short lastname']
    },
    username:{
        type:String,
        trim:true,
        minLength:[4,'to short username']
    },

    email:{
        type:String,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },

    recoveryemail:{
        type:String,
        trim:true,
        lowercase:true
    },

    DOB:{
        type:String,
    },
    
    mobilenumber:{
        type:String,
        unique:true,
    },

    role:{
        type:String,
        enum:['user','company_HR'],
        default:'user'

    },
    status:{
        type:String,
        enum:['online','offline'],
        default:'offline'
    },
    otp:String

    

} ,{ timestamps:true, versionkey:false} )

schema.pre("save",function(next){
    this.username = this.firstname + "" +this.lastname
    next()
})



export const User = model('User',schema) 
