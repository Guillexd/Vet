import { Request, Response } from "express"
import { ErrorI } from "../interfaces/error.interface"
import { addUser, getUserByEmailToLogin, updateUser, getUserByEmail, changePassword, getUsers, deleteUser } from "../services/user.service"
import { errorMessage, errorName, succesfullMessage, succesfullName } from "../utils/data.dictionary"
import { deleteFile, generateToken, verifyToken } from "../utils/utils"
import { Message } from "../interfaces/message.interface"
import { transporter } from "../utils/nodemailer"
import CustomError from "../utils/error"
import { User, UserMongo } from "../interfaces/user.interface"

export async function getAllUsers(req: Request, res: Response) {

    const { page, limit, filter, inputFilter } = req.query
    try {
        const currentPage: number = !!parseInt(page as string) ? parseInt(page as string) : 1
        const currentLimit: number = !!parseInt(limit as string) ? parseInt(limit as string) : 6
        const currentFilter: string = filter?.length ? filter as string : 'name'
        const currentInputFilter: string = inputFilter?.length ? inputFilter as string : ''
        const users = await getUsers(currentPage, currentLimit, currentFilter, currentInputFilter)
        return res.status(200).json(users)
    } catch (error) {
        const { name, message }: ErrorI = <ErrorI>error
        const messageError: Message = {
            status: 0,
            name,
            message,
        }
        return res.status(400).json(messageError)
    }
}

export async function getOneUserByEmail(req: Request, res: Response) {

    const { email, password } = req.body
    
    try {
        const user = await getUserByEmailToLogin(email, password)
        const message: Message = {
            status: 1,
            name: succesfullMessage.MESSAGE_200_CODE,
            message: succesfullMessage.MESSAGE_200_CODE,
        }
        
        return res.status(200).cookie("tokenJwt", user, { httpOnly: true, maxAge: 1000 * 60 * 60, signed: true }).json(message)
    } catch (error: any) {
        const { name, message }: ErrorI = <ErrorI>error
        const messageError: Message = {
            status: 0,
            name,
            message,
        }
        return res.status(400).json(messageError)
    }
}

export async function addOneUser(req: Request, res: Response) {

    const { name, last_name, nick_name, age, email, password } = req.body
    const fieldname: string | null = req.file ? req.file.filename : null
    try {
        const newUser = await addUser({ name, last_name, nick_name, age, email, password, profile_image: fieldname })
        const message: Message = {
            status: 1,
            name: succesfullMessage.MESSAGE_201_CODE,
            message: succesfullMessage.MESSAGE_201_CODE,
        }
        return res.status(201).json(message)
    } catch (error) {
        const { name, message }: ErrorI = <ErrorI>error
        const messageError: Message = {
            status: 0,
            name,
            message,
        }
        return res.status(401).json(messageError)
    }
}

export async function updateOneUser(req: Request, res: Response) {

    const { name, last_name, nick_name, age, email } = req.body
    const fieldname: string | null = req.file ? req.file.filename : null
    try {
        const updatedUser: UserMongo = await updateUser({ name, last_name, nick_name, age, email, profile_image: fieldname })
        
        if(!updatedUser) {
            CustomError.createCustomError({
                name: errorName.TOKEN_NOT_EXISTS_NAME,
                message: errorMessage.TOKEN_NOT_EXISTS_MESSAGE,
            })
        }
        
        if(fieldname) {
            deleteFile("/profile_images/" + updatedUser.profile_image )
        }
        
        const message: Message = {
            status: 1,
            name: succesfullMessage.MESSAGE_200_CODE,
            message: succesfullMessage.MESSAGE_200_CODE,
        }
        return res.status(200).json(message)
    } catch (error) {
        const { name, message }: ErrorI = <ErrorI>error
        const messageError: Message = {
            status: 0,
            name,
            message,
        }
        return res.status(401).json(messageError)
    }
}

export async function changeOnePassword(req: Request, res: Response) {
    
    const { password } = req.body
    const { email } = <Omit<UserMongo, "password" | "createdAt" | "updatedAt" | "__v">>req.user
    
    try {
        const newPassword = await changePassword(email, password)
        
        if(!newPassword) {
            CustomError.createCustomError({
                name: errorName.CHANGE_PASSWORD_ERROR_NAME,
                message: errorMessage.CHANGE_PASSWORD_ERROR_MESSAGE,
            })
        }
        
        const message: Message = {
            status: 1,
            name: succesfullMessage.MESSAGE_200_CODE,
            message: succesfullMessage.MESSAGE_200_CODE,
        }
        return res.status(200).clearCookie("changePJwt").json(message)
    } catch (error) {
        const { name, message }: ErrorI = <ErrorI>error
        const messageError: Message = {
            status: 0,
            name,
            message,
        }
        return res.status(401).json(messageError)
    }
}

export async function deleteOneUser(req: Request, res: Response) {

    const { email } = req.body
    try {
        const deletedUser = await deleteUser(email)
        
        if(!deletedUser) {
            CustomError.createCustomError({
                name: errorName.DELETE_USER_ERROR_NAME,
                message: errorMessage.DELETE_USER_ERROR_MESSAGE,
            })
        }
        
        deleteFile("/profile_images/" + deletedUser.profile_image )

        const message: Message = {
            status: 1,
            name: succesfullName.DELETE_USER_SUCCESS_NAME,
            message: succesfullMessage.DELETE_USER_SUCCESS_MESSAGE,
        }
        return res.status(200).json(message)
    } catch (error) {
        const { name, message }: ErrorI = <ErrorI>error
        const messageError: Message = {
            status: 0,
            name,
            message,
        }
        return res.status(401).json(messageError)
    }
}

export async function sendEmailToChangePassword(req: Request, res: Response) {

    const { email } = req.body 
    try {
        const user: User = await getUserByEmail(email)
        const token = generateToken(user, '10m')
        const htmlEmail = `<h2>Hola ${user.nick_name || user.name}</h2> <h4>Tienes que presionar el boton de abajo para poder cambiar tu contraseña.</h4> <br> <a style="background-color: #008CBA; border-radius: 10px; color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;" href="http://localhost:5173/change-password?changePJwt=${token}" target="_blank">Cambiar contraseña</a>`
        const mailOptions = {
            from: 'tu_correo@gmail.com',
            to: email,
            subject: 'Cambiar tu contraseña de Vet',
            // html: `<h2>Hola ${user.nick_name || user.name}</h2> <h4>Tienes que presionar el boton de abajo para poder cambiar tu contraseña.</h4> <br> <a style="background-color: #008CBA; border-radius: 10px; color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;" href="http://localhost:5173/change-password" target="_blank">Cambiar contraseña</a>`,
            html: htmlEmail,
        }

        // Enviar el correo electrónico
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                CustomError.createCustomError({
                    name: errorName.POST_EMAIL_NOT_SEND_NAME,
                    message: errorMessage.POST_EMAIL_NOT_SEND_MESSAGE,
                })
            } else {
                console.log('Correo enviado: ' + info.response)
                const message: Message = {
                    status: 1,
                    name: succesfullMessage.POST_EMAIL_SEND_MESSAGE,
                    message: succesfullMessage.POST_EMAIL_SEND_MESSAGE,
                }
                return res.status(200).json(message)
            }
        })
    } catch (error) {
        const { name, message }: ErrorI = <ErrorI>error
        const messageError: Message = {
            status: 0,
            name,
            message,
        }
        return res.status(403).json(messageError)
    }
}

export function clearTokenLogOut(req: Request, res: Response) {
    return res.clearCookie('tokenJwt').json(
        {
            status: 1,
            name: succesfullName.LOG_OUT_NAME,
            message: succesfullMessage.LOG_OUT_MESSAGE,
        }
    )
}

export async function getToken(req: Request, res: Response) {
    
    try {
        const token: any = verifyToken(req.signedCookies.tokenJwt)
        if (token?.user) {
            return res.json(
                {
                    status: 1,
                    name: succesfullName.TOKEN_EXISTS_NAME,
                    message: succesfullMessage.TOKEN_EXISTS_MESSAGE,
                }
            )
        }
        return res.status(401).json(
            {
                status: 0,
                name: errorName.TOKEN_NOT_EXISTS_NAME,
                message: errorMessage.TOKEN_NOT_EXISTS_MESSAGE,
            }
        )
    } catch (error) {
        // console.log(error instanceof jwt.TokenExpiredError)
        // console.log(error instanceof jwt.JsonWebTokenError)

        const { name, message }: ErrorI = <ErrorI>error
        const messageError: Message = {
            status: 0,
            name,
            message,
        }
        return res.status(401).json(messageError)
    }
}

export async function generateCookieFromPassport(req: Request | any, res: Response) {
    try {
        const isOk: boolean = !!req.user.message
        if(!isOk) {
            // const uri: string = 'http://192.168.0.102:5173'
            const token: string = generateToken(req.user, '1h')
            return res.send(`<script>window.opener.postMessage({ token: '${token}' }, 'http://localhost:5173');window.close();</script>`)
        } else {
            return res.send(`<script>window.opener.postMessage({ token: '${null}' }, 'http://localhost:5173');window.close();</script>`)
        }
    } catch (err) {
        return res.send(`${req.user.message}`)
    }
}

export async function putCookieFromPassport(req: Request, res: Response) {

    const { jwtToken } = req.body
    try {
        const isValid = verifyToken(jwtToken)
        if(isValid) {
            return res.cookie("tokenJwt", jwtToken, { httpOnly: true, maxAge: 1000 * 60 * 60, signed: true }).json(
                {
                    status: 1,
                    name: succesfullName.TOKEN_EXISTS_NAME,
                    message: succesfullMessage.TOKEN_EXISTS_MESSAGE,
                }
            )
        }
    } catch (error) {
        const { name, message }: ErrorI = <ErrorI>error
        const messageError: Message = {
            status: 0,
            name,
            message,
        }
        return res.status(400).json(messageError)
    }
}