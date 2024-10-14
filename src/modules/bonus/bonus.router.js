import { Router } from "express";
import { excelsheet } from "./bonus.controller.js";

const bonusrouter = Router()

bonusrouter.get('/:id',excelsheet)



export default bonusrouter