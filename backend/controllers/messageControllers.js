import Message from "../models/messageModel.js"
import { getReceiverSocketId, io } from "../socket/socket.js"

export const newMessage = async (req, res) => {
    try {
        const { conversationId, senderId, message, receiverId } = req.body

        if(!conversationId || !senderId || !message) return res.status(400).json({ error: "Message is required." })

        const newMessage = new Message({
            conversationId,
            senderId,
            message,
            receiverId
        })
        const savedMessage = await newMessage.save()

        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", savedMessage)
        }

        res.status(201).json(savedMessage)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const getConversationMessages = async (req, res) => {
    try {
        const { conversationId } = req.params

        const messages = await Message.find({ conversationId })

        res.status(200).json(messages)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}