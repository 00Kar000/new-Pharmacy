"use server"
import mongoose from 'mongoose'


let isConnected = false 

export const connectToDb = async () => {

    if(!process.env.MONGODB_URL) return console.log("MONGODB URL NOT FOUND")
    if(isConnected) return console.log("Already connected to MongoDB")

    try {
        await mongoose.connect(process.env.MONGODB_URL);

        isConnected = true
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error)
    }
}