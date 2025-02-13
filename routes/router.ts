import { Router } from "express";
import controller from "../controller/controller.js"; 
const router=Router()

router.post('/register',controller.register)
router.post('/login',controller.login)
export default router

