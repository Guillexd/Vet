import { User } from "../interfaces/user.interface"
import { userDao } from "../persistence/daos/factory"

export async function getUsers(page: number, limit: number, filter: string, inputFilter: string) {
    const users = await userDao.getUsers(page, limit, filter, inputFilter)
    return users
}

export async function getUserByEmailToLogin( email: string, password: string ) {
    const user = await userDao.getUserByEmailToLogin(email, password)
    return user
}

export async function addUser( data: User ) {
    const newUser = await userDao.addUser(data)
    return newUser
}

export async function updateUser( data: Omit<User, "password"> ) {
    const updatedUser = await userDao.updateUser(data)
    return updatedUser
}

export async function getUserByEmail( email: string ) {
    const user = await userDao.getUserByEmail(email)
    return user
}

export async function changePassword( email: string, password: string ) {
    const user = await userDao.changePassword({email, password})
    return user
}

export async function deleteUser( email: string ) {
    const user = await userDao.deleteUser(email)
    return user
}