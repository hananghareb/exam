import mongoose from "mongoose";

export const dbconnection = (()=>{
    mongoose.connect(process.env.DB).then(()=>{
        console.log('connected database successfully');
        
    }).catch(()=>{
        console.log('unconnected database');
        
    })

})  