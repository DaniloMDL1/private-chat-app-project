import Conversation from "../models/conversationModel.js"

export const newConversation = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body

        if(!senderId || !receiverId) return res.status(400).json({ error: "SenderId and receiverId are required." })

        let conversation

        conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId]}
        })

        if(!conversation) {
            conversation = new Conversation({
                participants: [senderId, receiverId]
            })
            
            conversation = await conversation.save()
        }


        res.status(201).json(conversation)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const getConversations = async (req, res) => {
    try {
        const { userId } = req.params

        const conversations = await Conversation.find({ participants: { $in: [userId]}})

        res.status(200).json(conversations)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}