import mongoose from "mongoose"
import env from "../../utils/env"

async function mongoConnection(): Promise<void> {
    try {
        await mongoose.connect(<string>env.mongo_uri)
        console.log("Mongo DB connected");
    } catch (error) {
        console.log(error);
    }
}

mongoConnection()