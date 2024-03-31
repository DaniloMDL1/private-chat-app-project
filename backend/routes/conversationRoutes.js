import express from "express"
import { getConversations, newConversation } from "../controllers/conversationControllers.js"

const router = express.Router()

router.get("/:userId", getConversations)
router.post("/new", newConversation)

export default router