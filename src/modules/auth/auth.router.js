import { Router } from "express";
import { signin, signup } from "./auth.controller.js";
import { signinVal, signupVal } from "./auth.validation.js";
import { validate } from "../../middleware/validate.js";

const authrouter = Router()

authrouter.post('/signup',validate(signupVal),signup)
authrouter.post('/signin',validate(signinVal),signin)



export default authrouter