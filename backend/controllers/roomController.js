import Room from "../models/roomModel.js"

export const createRoom = async (req, res) => {
    try {
        const { roomName, desc, userId } = req.body
        const loggedInUserId = req.user.userId

        if(loggedInUserId.toString() !== userId) return res.status(403).json({ error: "User is not authorized to create a room." })

        if(!roomName || !desc) return res.status(400).json({ error: "Room name and description are required." })

        const newRoom = new Room({
            roomName,
            desc,
            roomCreator: userId,
            participants: [userId]
        })
        const savedRoom = await newRoom.save()

        res.status(201).json(savedRoom)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const getRoomsByParticipants = async (req, res) => {
    try {
        const { userId } = req.params   

        const rooms = await Room.find({ participants: { $in: [userId] }})

        res.status(200).json(rooms)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const addUserToRoom = async (req, res) => {
    try {
        const { roomId } = req.params
        const { userId } = req.body

        const room = await Room.findById(roomId)
        if(!room) return res.status(404).json({ error: "Room not found." })

        const updatedRoom = await Room.findByIdAndUpdate(roomId, { $push: { participants: userId }}, { new: true })

        res.status(200).json(updatedRoom)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const leaveRoom = async (req, res) => {
    try {
        const { roomId } = req.params
        const { userId } = req.body

        const room = await Room.findById(roomId)
        if(!room) return res.status(404).json({ error: "Room not found." })

        const updatedRoom = await Room.findByIdAndUpdate(roomId, { $pull: { participants: userId }}, { new: true })

        res.status(200).json(updatedRoom)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}