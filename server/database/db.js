import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

const connect = async () => {
    try {
        mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.f6yte.mongodb.net/mern-blog?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('Connected to MongoDB')
    } catch (err) {
        console.log(err)
    }
}

export default connect