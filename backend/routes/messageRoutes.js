import express from "express"
import { deleteMessage, getConversationMessages, newConversationMessage } from "../controllers/messageControllers.js"
import protectRoute from "../middlewares/protectRoute.js"

const router = express.Router()

router.get("/:conversationId", getConversationMessages)
router.post("/new", newConversationMessage)
router.delete("/delete/:messageId", protectRoute, deleteMessage)

export default router