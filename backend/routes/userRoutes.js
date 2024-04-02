import express from "express"
import protectRoute from "../middlewares/protectRoute.js"
import { searchUsers, updateProfile } from "../controllers/userControllers.js"

const router = express.Router()

router.get("/search", searchUsers)
router.put("/update/:userId", protectRoute, updateProfile)

export default router