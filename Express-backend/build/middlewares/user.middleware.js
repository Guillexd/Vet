"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatedUser = exports.changePasswordValidator = exports.updateUserValidator = exports.createUserValidator = void 0;
const express_validator_1 = require("express-validator");
const data_dictionary_1 = require("../utils/data.dictionary");
const error_1 = __importDefault(require("../utils/error"));
exports.createUserValidator = [
    (0, express_validator_1.body)('email').trim().exists({ values: "falsy" }).withMessage(`El correo ${data_dictionary_1.errorMessage.POST_NEW_USER_BY_EMPTY_FIELD_ERROR}`).isEmail().withMessage('No es un correo válido.').escape(),
    (0, express_validator_1.body)('name').trim().exists({ values: "falsy" }).withMessage(`El nombre ${data_dictionary_1.errorMessage.POST_NEW_USER_BY_EMPTY_FIELD_ERROR}`).not().isNumeric().withMessage(`El nombre no ${data_dictionary_1.errorMessage.POST_NEW_USER_BY_TYPE_FIELD_ERROR} numérico.`).escape(),
    (0, express_validator_1.body)('last_name').trim().exists({ values: "falsy" }).withMessage(`El apellido ${data_dictionary_1.errorMessage.POST_NEW_USER_BY_EMPTY_FIELD_ERROR}`).not().isNumeric().withMessage(`El apellido no ${data_dictionary_1.errorMessage.POST_NEW_USER_BY_TYPE_FIELD_ERROR} numérico.`).escape(),
    (0, express_validator_1.body)('nick_name').trim().optional().not().isNumeric().withMessage(`El apellido no ${data_dictionary_1.errorMessage.POST_NEW_USER_BY_TYPE_FIELD_ERROR} numérico.`).escape(),
    (0, express_validator_1.body)('age').trim().exists({ values: "falsy" }).withMessage(`La edad ${data_dictionary_1.errorMessage.POST_NEW_USER_BY_EMPTY_FIELD_ERROR}`).isNumeric().withMessage(`La edad ${data_dictionary_1.errorMessage.POST_NEW_USER_BY_TYPE_FIELD_ERROR} numérica.`).escape(),
    (0, express_validator_1.body)('password').trim().exists({ values: "falsy" }).withMessage(`La contraseña ${data_dictionary_1.errorMessage.POST_NEW_USER_BY_EMPTY_FIELD_ERROR}`).isLength({ min: 4 }).withMessage(`La contraseña ${data_dictionary_1.errorMessage.POST_NEW_USER_BY_TYPE_FIELD_ERROR} mayor a 4 caractéres.`).isLength({ max: 30 }).withMessage(`La contraseña ${data_dictionary_1.errorMessage.POST_NEW_USER_BY_TYPE_FIELD_ERROR} menor a 30 caractéres.`).escape()
];
exports.updateUserValidator = [
    (0, express_validator_1.body)('name').trim().exists({ values: "falsy" }).withMessage(`El nombre ${data_dictionary_1.errorMessage.POST_NEW_USER_BY_EMPTY_FIELD_ERROR}`).not().isNumeric().withMessage(`El nombre no ${data_dictionary_1.errorMessage.POST_NEW_USER_BY_TYPE_FIELD_ERROR} numérico.`).escape(),
    (0, express_validator_1.body)('last_name').trim().exists({ values: "falsy" }).withMessage(`El apellido ${data_dictionary_1.errorMessage.POST_NEW_USER_BY_EMPTY_FIELD_ERROR}`).not().isNumeric().withMessage(`El apellido no ${data_dictionary_1.errorMessage.POST_NEW_USER_BY_TYPE_FIELD_ERROR} numérico.`).escape(),
    (0, express_validator_1.body)('nick_name').trim().optional().not().isNumeric().withMessage(`El apellido no ${data_dictionary_1.errorMessage.POST_NEW_USER_BY_TYPE_FIELD_ERROR} numérico.`).escape(),
    (0, express_validator_1.body)('age').trim().exists({ values: "falsy" }).withMessage(`La edad ${data_dictionary_1.errorMessage.POST_NEW_USER_BY_EMPTY_FIELD_ERROR}`).isNumeric().withMessage(`La edad ${data_dictionary_1.errorMessage.POST_NEW_USER_BY_TYPE_FIELD_ERROR} numérica.`).escape(),
];
exports.changePasswordValidator = [
    (0, express_validator_1.body)('password').trim().exists({ values: "falsy" }).withMessage(`La contraseña ${data_dictionary_1.errorMessage.POST_NEW_USER_BY_EMPTY_FIELD_ERROR}`).not().isNumeric().withMessage(`La contraseña no ${data_dictionary_1.errorMessage.POST_NEW_USER_BY_TYPE_FIELD_ERROR} numérica.`).escape(),
];
const validatedUser = (req, res, next) => {
    const error = (0, express_validator_1.validationResult)(req).array();
    if (error.length > 0) {
        error_1.default.createCustomError({
            name: data_dictionary_1.errorName.POST_NEW_USER_ERROR,
            message: JSON.stringify(error)
        });
    }
    next();
};
exports.validatedUser = validatedUser;
