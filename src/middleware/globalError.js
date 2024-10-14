export const globalerror = ((err,req,res,next)=>{
    res.status(err.statuscode||500).json({error:'error' ,message:err.message,
        code:err.statuscode||500 , stack: err.stack})

})