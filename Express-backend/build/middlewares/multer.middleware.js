"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadUpdateProfileImage = exports.uploadCreateProfileImage = void 0;
const multer_1 = __importDefault(require("multer"));
const utils_1 = require("../utils/utils");
const joi_1 = __importDefault(require("joi"));
const createUserSchema = joi_1.default.object({
    email: joi_1.default.string().trim().required().email().empty(""),
    name: joi_1.default.string().trim().required().not(joi_1.default.number()).empty(""),
    last_name: joi_1.default.string().trim().required().empty("").not(joi_1.default.number()),
    nick_name: joi_1.default.string().trim().empty("").not(joi_1.default.number()),
    age: joi_1.default.number().required(),
    password: joi_1.default.string().not(joi_1.default.number()).required().empty("").not(joi_1.default.number()).min(4).max(30),
});
exports.uploadCreateProfileImage = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: function (req, file, callback) {
            callback(null, (0, utils_1.joinSrcDir)("/public/profile_images"));
        },
        filename: function (req, file, callback) {
            callback(null, `${Date.now()}-${file.originalname}`);
        }
    }),
    fileFilter(req, file, callback) {
        const { error, value } = createUserSchema.validate(req.body);
        console.log(file);
        console.log(error);
        if ((error === null || error === void 0 ? void 0 : error.details.length) || (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/gif')) {
            callback(null, false);
        }
        else {
            callback(null, true);
        }
    },
});
const updateUserSchema = joi_1.default.object({
    email: joi_1.default.string().trim().required().email().empty(""),
    name: joi_1.default.string().trim().required().not(joi_1.default.number()).empty(""),
    last_name: joi_1.default.string().trim().required().empty("").not(joi_1.default.number()),
    nick_name: joi_1.default.string().trim().empty("").not(joi_1.default.number()),
    age: joi_1.default.number().required(),
});
exports.uploadUpdateProfileImage = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: function (req, file, callback) {
            callback(null, (0, utils_1.joinSrcDir)("/public/profile_images"));
        },
        filename: function (req, file, callback) {
            callback(null, `${Date.now()}-${file.originalname}`);
        }
    }),
    fileFilter(req, file, callback) {
        const { error, value } = updateUserSchema.validate(req.body);
        console.log(file);
        if ((error === null || error === void 0 ? void 0 : error.details.length) || (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/gif' && file.mimetype !== 'image/webp')) {
            callback(null, false);
        }
        else {
            callback(null, true);
        }
    },
});
