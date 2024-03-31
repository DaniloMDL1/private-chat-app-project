import User from "../models/userModel.js"
import bcrypt from "bcryptjs"

export const updateProfile = async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body
        let { profilePicture } = req.body
        const { userId } = req.params
        const loggedInUserId = req.user.userId

        if(userId !== loggedInUserId.toString()) return res.status(403).json({ error: "User is not allowed to update other user's profile." })

        let user = await User.findById(userId)
        if(!user) return res.status(404).json({ error: "User not found." })

        if(password) {
            const salt = await bcrypt.genSalt(10)
            const passwordHash = await bcrypt.hash(password, salt)
            user.password = passwordHash
        }

        user.fullName = fullName || user.fullName
        user.username = username || user.username
        user.email = email || user.email
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}