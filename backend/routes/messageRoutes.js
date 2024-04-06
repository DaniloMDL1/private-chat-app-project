import express from "express"
import { deleteMessage, getConversationMessages, newConversationMessage, newRoomMessage } from "../controllers/messageControllers.js"
import protectRoute from "../middlewares/protectRoute.js"

const router = express.Router()

router.get("/:conversationId", getConversationMessages)
router.post("/new", newConversationMessage)
router.post("/newRoomMessage", newRoomMessage)
router.delete("/delete/:messageId", protectRoute, deleteMessage)

export default router