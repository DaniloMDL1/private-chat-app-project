import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import { v2 as cloudinary } from "cloudinary"

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

        if(profilePicture) {
            const uploadedResponse = await cloudinary.uploader.upload(profilePicture)
            profilePicture = uploadedResponse.secure_url

            if(user.profilePicture) {
                await cloudinary.uploader.destroy(user.profilePicture.split("/").pop().split(".")[0])
            }
        }

        user.fullName = fullName || user.fullName
        user.username = username || user.username
        user.email = email || user.email
        user.profilePicture = profilePicture || user.profilePicture

        user = await user.save()

        const { password: pass, ...userInfo } = user._doc

        res.status(200).json(userInfo)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const searchUsers = async (req, res) => {
    try {
        const loggedInUserId = req.user.userId

        const users = await User.find({ $and: [
            {
                _id: { $ne: loggedInUserId }
            },
            {
                $or: [
                    {
                        fullName: { $regex: req.query.searchTerm, $options: "i"}
                    },
                    {
                        username: { $regex: req.query.searchTerm, $options: "i"}
                    }
                ]
            }
        ]})

        res.status(200).json(users)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

export const getUser = async (req, res) => {
    try {
        const { userId } = req.params

        const user = await User.findOne({ _id: userId })
        if(!user) return res.status(404).json({ error: "User not found." })

        res.status(200).json(user)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}