import { NextFunction, Response, Request } from "express"
import { body, validationResult } from "express-validator"
import { errorName, errorMessage } from "../utils/data.dictionary"
import CustomError from "../utils/error"

export const createUserValidator = [
    body('email').trim().exists({ values: "falsy" }).withMessage(`El correo ${errorMessage.POST_NEW_USER_BY_EMPTY_FIELD_ERROR}`).isEmail().withMessage('No es un correo válido.').escape(),
    body('name').trim().exists({ values: "falsy" }).withMessage(`El nombre ${errorMessage.POST_NEW_USER_BY_EMPTY_FIELD_ERROR}`).not().isNumeric().withMessage(`El nombre no ${errorMessage.POST_NEW_USER_BY_TYPE_FIELD_ERROR} numérico.`).escape(),
    body('last_name').trim().exists({ values: "falsy" }).withMessage(`El apellido ${errorMessage.POST_NEW_USER_BY_EMPTY_FIELD_ERROR}`).not().isNumeric().withMessage(`El apellido no ${errorMessage.POST_NEW_USER_BY_TYPE_FIELD_ERROR} numérico.`).escape(),
    body('nick_name').trim().optional().not().isNumeric().withMessage(`El apellido no ${errorMessage.POST_NEW_USER_BY_TYPE_FIELD_ERROR} numérico.`).escape(),
    body('age').trim().exists({ values: "falsy" }).withMessage(`La edad ${errorMessage.POST_NEW_USER_BY_EMPTY_FIELD_ERROR}`).isNumeric().withMessage(`La edad ${errorMessage.POST_NEW_USER_BY_TYPE_FIELD_ERROR} numérica.`).escape(),
    body('password').trim().exists({ values: "falsy" }).withMessage(`La contraseña ${errorMessage.POST_NEW_USER_BY_EMPTY_FIELD_ERROR}`).isLength({ min: 4 }).withMessage(`La contraseña ${errorMessage.POST_NEW_USER_BY_TYPE_FIELD_ERROR} mayor a 4 caractéres.`).isLength({ max: 30 }).withMessage(`La contraseña ${errorMessage.POST_NEW_USER_BY_TYPE_FIELD_ERROR} menor a 30 caractéres.`).escape()
]

export const updateUserValidator = [
    body('name').trim().exists({ values: "falsy" }).withMessage(`El nombre ${errorMessage.POST_NEW_USER_BY_EMPTY_FIELD_ERROR}`).not().isNumeric().withMessage(`El nombre no ${errorMessage.POST_NEW_USER_BY_TYPE_FIELD_ERROR} numérico.`).escape(),
    body('last_name').trim().exists({ values: "falsy" }).withMessage(`El apellido ${errorMessage.POST_NEW_USER_BY_EMPTY_FIELD_ERROR}`).not().isNumeric().withMessage(`El apellido no ${errorMessage.POST_NEW_USER_BY_TYPE_FIELD_ERROR} numérico.`).escape(),
    body('nick_name').trim().optional().not().isNumeric().withMessage(`El apellido no ${errorMessage.POST_NEW_USER_BY_TYPE_FIELD_ERROR} numérico.`).escape(),
    body('age').trim().exists({ values: "falsy" }).withMessage(`La edad ${errorMessage.POST_NEW_USER_BY_EMPTY_FIELD_ERROR}`).isNumeric().withMessage(`La edad ${errorMessage.POST_NEW_USER_BY_TYPE_FIELD_ERROR} numérica.`).escape(),
]

export const changePasswordValidator = [
    body('password').trim().exists({ values: "falsy" }).withMessage(`La contraseña ${errorMessage.POST_NEW_USER_BY_EMPTY_FIELD_ERROR}`).not().isNumeric().withMessage(`La contraseña no ${errorMessage.POST_NEW_USER_BY_TYPE_FIELD_ERROR} numérica.`).escape(),
]

export const validatedUser = (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req).array()
    if (error.length > 0) {
        CustomError.createCustomError({
            name: errorName.POST_NEW_USER_ERROR,
            message: JSON.stringify(error)
        })
    }
    next()
}