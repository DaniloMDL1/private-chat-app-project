import express from "express"
import { addUserToRoom, createRoom, getRoomsByParticipants, leaveRoom } from "../controllers/roomController.js"
import protectRoute from "../middlewares/protectRoute.js"

const router = express.Router()

router.get("/:userId", getRoomsByParticipants)
router.post("/create", protectRoute, createRoom)
router.put("/participants/:roomId", protectRoute, addUserToRoom)
router.put("/leave/:roomId", leaveRoom)

export default router