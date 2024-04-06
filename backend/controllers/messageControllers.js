import Message from "../models/messageModel.js"
import { getReceiverSocketId, io } from "../socket/socket.js"

export const newConversationMessage = async (req, res) => {
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

export const deleteMessage = async (req, res) => {
    try {
        const { messageId } = req.params

        const message = await Message.findById(messageId)
        if(!message) return res.status(404).json({ error: "Message not found." })

        await Message.findByIdAndDelete(messageId)

        io.emit("deleteMessage", messageId)

        res.status(200).json({ msg: "Message has been successfully deleted." })
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const newRoomMessage = async (req, res) => {
    try {
        const { senderId, roomId, message } = req.body

        if(!senderId || !roomId || !message) return res.status(400).json({ error: "Message is required." })

        const newMessage = new Message({
            senderId,
            roomId,
            message
        })
        const savedMessage = await newMessage.save()

        res.status(201).json(savedMessage)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}