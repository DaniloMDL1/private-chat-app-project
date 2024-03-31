import Message from "../models/messageModel.js"

export const newMessage = async (req, res) => {
    try {
        const { conversationId, senderId, message } = req.body

        if(!conversationId || !senderId || !message) return res.status(400).json({ error: "Message is required." })

        const newMessage = new Message({
            conversationId,
            senderId,
            message
        })
        const savedMessage = await newMessage.save()

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