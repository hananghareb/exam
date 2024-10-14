import multer from "multer";
import { AppError } from "./appError.js";

export const filteration = {
    file:["application/pdf"]
}

export const uploadfile = (filter)=>{
    const storage = multer.diskStorage({})
    const filefilter = (req,file,cb)=>{
        if(filter.includes(file.mimetype)){
            cb(null,true)
        }
        else{
            cb(next(new AppError('invaild upload'),false))
        }
    }
    const upload = multer({storage,filefilter})
    return upload
}