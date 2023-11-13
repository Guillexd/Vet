import { UserMongo } from "../../interfaces/user.interface"
import env from "../../utils/env"

export const userResponse = ( { _doc }: any ): any => {
    if(env.persistence === "MONGO") {
        delete _doc.password
        delete _doc.__v
        delete _doc.createdAt
        delete _doc.updatedAt
        return _doc
    }
}

export const usersResponse = ( docs: UserMongo[] ) => {
    if(env.persistence === "MONGO") {
        const data: Omit<UserMongo[], "password" | "__v" | "updatedAt" >[] = docs.map((user: any) => {
            const _doc = {...user._doc}
            delete _doc.password
            delete _doc.__v
            delete _doc.updatedAt
            return _doc
        })
        return data
    }
}