import { User, UserDataBase } from "../../interfaces/user.interface"
import CustomError from "../../utils/error"
import { errorMessage, errorName } from "../../utils/data.dictionary"
import { comparePassword, generateToken, hashPassord } from "../../utils/utils"
import { userResponse, usersResponse } from "../dtos/user.dto"

export default class UserRepository implements UserDataBase {

    dao: UserDataBase

    constructor( dao: UserDataBase ) {
        this.dao = dao
    }

    async getUsers(page: number, limit: number, filter: string, inputFilter: string) {
        const users = await this.dao.getUsers(page, limit, filter, inputFilter)
        const docs = usersResponse(users.docs)
        const dataUsers = {...users, docs}
        return dataUsers
    }

    async getUserByEmailToLogin( email: string, password: string ): Promise<string> {
        const userDao = await this.dao.getUserByEmail( email )

        if(!userDao) {
            CustomError.createCustomError({
                name: errorName.GET_USER_ERROR,
                message: errorMessage.GET_USER_ERROR_MESSAGE,
            })
        }
        
        const isPassword = await comparePassword(password, userDao.password)

        if(!isPassword) {
            CustomError.createCustomError({
                name: errorName.GET_USER_ERROR,
                message: errorMessage.GET_USER_ERROR_MESSAGE,
            })
        }

        const user = userResponse(userDao)
        const token = generateToken(user, '1h')
        return token    
    }

    async addUser( { name, last_name, nick_name, age, profile_image, email, password }: User ) {
        const user = await this.dao.getUserByEmail( email )

        if(!!user) {
            CustomError.createCustomError({
                name: errorName.POST_NEW_USER_ERROR,
                message: `El correo ${errorMessage.POST_NEW_USER_BY_FIELD_NOT_UNIQUE}`,
            })
        }

        const hashedPassword = await hashPassord(password)
        const dataUser: User = { name, last_name, age, email, password: hashedPassword }
        if(nick_name) { dataUser.nick_name = nick_name }
        if(profile_image) { dataUser.profile_image = profile_image }
        
        const newUser = await this.dao.addUser( dataUser )
        return newUser
    }

    async updateUser( { name, last_name, nick_name, age, profile_image, email }: Omit<User, "password"> ) {
        const dataUser: Omit<User, "password"> = { name, last_name, age, email }
        if(nick_name) { dataUser.nick_name = nick_name }
        if(profile_image) { dataUser.profile_image = profile_image }
        const newUser = await this.dao.updateUser( dataUser )
        return newUser
    }

    async changePassword( {email, password}: {email: string, password: string} ) {
        const hashedPassword = await hashPassord(password)
        const updatedUser = await this.dao.changePassword( { email, password: hashedPassword } )
        return updatedUser
    }

    async deleteUser( email: string ) {
        const user = await this.dao.deleteUser( email )
        return user
    }

    async getUserByEmail( email: string ) {
        const userDao = await this.dao.getUserByEmail( email )
        
        if(!userDao) {
            CustomError.createCustomError({
                name: errorName.GET_USER_BY_EMAIL_TO_CHANGE_PASSWORD_NAME,
                message: errorMessage.GET_USER_BY_EMAIL_TO_CHANGE_PASSWORD_MESSAGE,
            })
        }
        const user = userResponse(userDao)

        return user
    }
}