export interface User {
    name: string,
    last_name: string,
    nick_name?: string,
    age: number,
    profile_image?: string | null,
    email: string,
    password: string,
}

export interface UserMongo extends User {
    _id: string | number,
    createdAt: string,
    updatedAt: string,
    __v: any,
}

export interface UserDataBase {
    getUsers(page: number, limit: number, filter: string, inputFilter: string): any; 
    getUserByEmail( email: string, password: string ): any; 
    addUser(user: User): any; 
    updateUser(user: Omit<User, "password">): any; 
    changePassword({email, password}: {email: string, password: string}): any; 
    deleteUser(userId: string): any; 
    getUserByEmail(email: string): any; 
}

export interface UserFactory extends UserDataBase {
    getUserByEmailToLogin( email: string, password: string ): any;
}