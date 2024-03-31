import express from "express"
import protectRoute from "../middlewares/protectRoute.js"
import { updateProfile } from "../controllers/userControllers.js"

const router = express.Router()

router.put("/update/:userId", protectRoute, updateProfile)

export default router