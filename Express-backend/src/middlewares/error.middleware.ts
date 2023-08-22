import { NextFunction, Request, Response } from 'express'
import { ErrorI } from '../interfaces/error.interface'
import { Message } from '../interfaces/message.interface'
import { errorMessage, errorName } from '../utils/data.dictionary'

export const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
    const { name, message }: ErrorI = error
    
    const messageError: Message = {
        status: 0,
        name: name === 'AuthenticationError' ? errorName.TOKEN_NOT_EXISTS_NAME : name,
        message: message === 'Unauthorized' ? errorMessage.TOKEN_NOT_EXISTS_MESSAGE : message,
    }
    return res.status(400).json(messageError)
}
  