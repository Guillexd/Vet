import { User, UserMongo } from "../../../interfaces/user.interface"
import { userModel } from "../../mongoDB/models/user.model"
import { PaginateResult } from "mongoose"

export default class UserManager {

    async getUsers(page: number, limit: number, filter: string, inputFilter: string): Promise<PaginateResult<UserMongo>> {
        const queryFilter: { [key: string]: any } = {}
        
        if (filter === 'age' && (typeof parseInt(inputFilter) == 'number') && inputFilter.length > 0) {
            queryFilter[filter] = { $eq: parseInt(inputFilter) }
        } else if(filter === 'age') {
            queryFilter[filter] = { $gte: -1 }
        } else {
            queryFilter[filter] = { $regex: inputFilter, $options: "i" }
        }
        console.log(queryFilter)
        
        const users: PaginateResult<UserMongo> = await userModel.paginate(queryFilter, { sort: { createdAt: -1}, limit, page });
        return users
    }

    async getUserByEmail( email: string ): Promise<UserMongo | null> {
        const user = await userModel.findOne({ email })
        return <UserMongo | null>user
    }

    async addUser( dataUser: User): Promise<UserMongo> {
        const user = await userModel.create(dataUser)
        return user
    }

    async updateUser( { email, ...dataUser }: Omit<User, "password"> ): Promise<UserMongo> {
        const user = await userModel.findOneAndUpdate({ email }, dataUser)
        return <UserMongo>user
    }

    async changePassword( { email, password }: Pick<User, "email" | "password"> ): Promise<UserMongo> {
        const user = await userModel.findOneAndUpdate({ email }, { password }, { new: true })
        return <UserMongo>user
    }

    async deleteUser( email: string ): Promise<UserMongo> {
        const user = await userModel.findOneAndDelete({ email })
        return <UserMongo>user
    }
}

class UserPremiunManager extends UserManager {
    
}