import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js"

export const signup = async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body

        if(!fullName || !username || !email || !password) return res.status(400).json({ error: "All fields are required." })

        const user = await User.find({ $or: [ { email }, { username } ]})
        if(user) return res.status(400).json({ error: "Email or username is already in use." })

        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            username,
            email,
            password: passwordHash
        })
        const savedUser = await newUser.save()
        generateTokenAndSetCookie(savedUser._id, res)

        const { password: pass, ...userInfo } = savedUser._doc

        res.status(201).json(userInfo)
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}