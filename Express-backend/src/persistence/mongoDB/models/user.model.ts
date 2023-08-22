import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { User, UserMongo } from "../../../interfaces/user.interface";

interface UserModel extends mongoose.Model<UserMongo> {
  paginate(query?: any, options?: any): any;
}

const userSchema = new mongoose.Schema<User>({
    name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    nick_name: {
        type: String,
    },
    age: {
        type: Number,
        required: true,
    },
    profile_image: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
},{
    timestamps: true,
})

userSchema.plugin(mongoosePaginate)

export const userModel: UserModel = mongoose.model<UserMongo, UserModel>("Users", userSchema)


