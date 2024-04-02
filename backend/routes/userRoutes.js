import express from "express"
import protectRoute from "../middlewares/protectRoute.js"
import { getUser, searchUsers, updateProfile } from "../controllers/userControllers.js"

const router = express.Router()

router.get("/search", protectRoute, searchUsers)
router.get("/:userId", getUser)
router.put("/update/:userId", protectRoute, updateProfile)

export default router