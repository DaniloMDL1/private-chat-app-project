import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import connectToMongoDB from "./db/connectToMongoDB.js"
import authRoutes from "./routes/authRoutes.js"

dotenv.config()
const app = express()
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true }))
app.use(cookieParser())

// ROUTES
app.use("/api/auth", authRoutes)

const PORT = process.env.PORT || 6001
connectToMongoDB()
app.listen(PORT, () => console.log(`Server port: ${PORT}`))