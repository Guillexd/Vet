import multer from "multer"
import { joinSrcDir } from "../utils/utils"
import Joi from "joi"

const createUserSchema = Joi.object({
    email: Joi.string().trim().required().email().empty("") ,
    name: Joi.string().trim().required().not(Joi.number()).empty(""),
    last_name: Joi.string().trim().required().empty("").not(Joi.number()),
    nick_name: Joi.string().trim().empty("").not(Joi.number()),
    age: Joi.number().required(),
    password: Joi.string().not(Joi.number()).required().empty("").not(Joi.number()).min(4).max(30),
})

export const uploadCreateProfileImage = multer({
    storage: multer.diskStorage({
       destination: function (req, file, callback) {
        callback(null, joinSrcDir("/public/profile_images"))
       },
       filename: function (req, file, callback) {
        callback(null, `${Date.now()}-${file.originalname}`)
       }
    }),
    fileFilter(req, file, callback) {
        const { error, value } = createUserSchema.validate(req.body)
        console.log(file)
        console.log(error)
        
        if(error?.details.length || (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/gif')) {
            callback(null, false)
        } else {
            callback(null, true)
        }
    },
})

const updateUserSchema = Joi.object({
    email: Joi.string().trim().required().email().empty("") ,
    name: Joi.string().trim().required().not(Joi.number()).empty(""),
    last_name: Joi.string().trim().required().empty("").not(Joi.number()),
    nick_name: Joi.string().trim().empty("").not(Joi.number()),
    age: Joi.number().required(),
})

export const uploadUpdateProfileImage = multer({
    storage: multer.diskStorage({
       destination: function (req, file, callback) {
        callback(null, joinSrcDir("/public/profile_images"))
       },
       filename: function (req, file, callback) {
        callback(null, `${Date.now()}-${file.originalname}`)
       }
    }),
    fileFilter(req, file, callback) {
        const { error, value } = updateUserSchema.validate(req.body)
        console.log(file);
        
        if(error?.details.length || (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/gif' && file.mimetype !== 'image/webp')) {
            callback(null, false)
        } else {
            callback(null, true)
        }
    },
})
