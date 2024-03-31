import mongoose from "mongoose"

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("MongoDB has been successfully connected.")
        
    } catch(error) {
        console.log(`MongoDB Error: ${error}`)
    }
}

export default connectToMongoDB