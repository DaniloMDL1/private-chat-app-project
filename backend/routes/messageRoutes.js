import express from "express"
import { getConversationMessages, newMessage } from "../controllers/messageControllers.js"

const router = express.Router()

router.get("/:conversationId", getConversationMessages)
router.post("/new", newMessage)

export default router