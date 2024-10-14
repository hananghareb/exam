import { config } from 'dotenv'

import dotenv from 'dotenv'
dotenv.config()
import path from 'path'
config({path:path.resolve("config/.env")})

import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
    secure:true
})

export default cloudinary

