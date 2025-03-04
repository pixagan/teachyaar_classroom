// Modified last: 24/02/2025
// Originally Created by : Anil Variyar/ Pixagan Technologies Private Limited


import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewURLParser: true,
        })

        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline)

    } catch(error){

        console.error(`Error : ${error.message}`.red.underline.bold)
        process.exit(1)

    }
}

export default connectDB