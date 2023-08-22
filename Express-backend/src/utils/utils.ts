import { hash, compare } from "bcrypt"
import { sign, verify,  } from "jsonwebtoken"
import { join } from "path"
import { existsSync, unlink } from "fs"
import env from "./env"

export const hashPassord = async(password: string): Promise<string> => {
    return await hash(password, 10) 
}

export const comparePassword = async(password: string, hashedPassowrd: string): Promise<boolean> => {
    return await compare(password, hashedPassowrd)
}

export const generateToken = (user: object, timeToExpire: string): string => {
    const token = sign({user}, env.secret_key_jwt!, { expiresIn: timeToExpire })
    return token
}

export const verifyToken = (token: string): object => {
    const tokenGenerated = verify(token, env.secret_key_jwt!)
    return tokenGenerated as object
}

export const joinSrcDir = (path: string): string => {
    return join(__dirname, "../" + path)
}

export const deleteFile = (path: string): void => {
    const newPath: string = joinSrcDir("/public" + path)
    
    if (existsSync(newPath)) {
        unlink(newPath, (err) => {
            if (err) {
                console.error('Error al eliminar el archivo anterior:', err);
            } else {
                console.log('Archivo anterior eliminado con éxito');
            }
        });
    }
}
