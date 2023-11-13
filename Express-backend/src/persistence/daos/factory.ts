import { UserDataBase, UserFactory } from "../../interfaces/user.interface"
import env from "../../utils/env"
import UserRepository from "../repositories/user.repository"

let userDao: UserFactory

async function connectWithPersistence() {
    console.log(env);
    
    switch (env.persistence) {
        case "MONGO": 
            await import("../mongoDB/mongo")
            const { default: UserManager } = await import("./mongoDaos/user.manager")



            userDao = new UserRepository(new UserManager())

            break
    
        default:
            break
    }

}

connectWithPersistence()

export { userDao }