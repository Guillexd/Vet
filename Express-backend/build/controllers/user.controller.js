"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putCookieFromPassport = exports.generateCookieFromPassport = exports.getToken = exports.clearTokenLogOut = exports.sendEmailToChangePassword = exports.deleteOneUser = exports.changeOnePassword = exports.updateOneUser = exports.addOneUser = exports.getOneUserByEmail = exports.getAllUsers = void 0;
const user_service_1 = require("../services/user.service");
const data_dictionary_1 = require("../utils/data.dictionary");
const utils_1 = require("../utils/utils");
const nodemailer_1 = require("../utils/nodemailer");
const error_1 = __importDefault(require("../utils/error"));
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { page, limit, filter, inputFilter } = req.query;
        try {
            const currentPage = !!parseInt(page) ? parseInt(page) : 1;
            const currentLimit = !!parseInt(limit) ? parseInt(limit) : 6;
            const currentFilter = (filter === null || filter === void 0 ? void 0 : filter.length) ? filter : 'name';
            const currentInputFilter = (inputFilter === null || inputFilter === void 0 ? void 0 : inputFilter.length) ? inputFilter : '';
            const users = yield (0, user_service_1.getUsers)(currentPage, currentLimit, currentFilter, currentInputFilter);
            return res.status(200).json(users);
        }
        catch (error) {
            const { name, message } = error;
            const messageError = {
                status: 0,
                name,
                message,
            };
            return res.status(400).json(messageError);
        }
    });
}
exports.getAllUsers = getAllUsers;
function getOneUserByEmail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const user = yield (0, user_service_1.getUserByEmailToLogin)(email, password);
            const message = {
                status: 1,
                name: data_dictionary_1.succesfullMessage.MESSAGE_200_CODE,
                message: data_dictionary_1.succesfullMessage.MESSAGE_200_CODE,
            };
            return res.status(200).cookie("tokenJwt", user, { httpOnly: true, maxAge: 1000 * 60 * 60, signed: true }).json(message);
        }
        catch (error) {
            const { name, message } = error;
            const messageError = {
                status: 0,
                name,
                message,
            };
            return res.status(400).json(messageError);
        }
    });
}
exports.getOneUserByEmail = getOneUserByEmail;
function addOneUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, last_name, nick_name, age, email, password } = req.body;
        const fieldname = req.file ? req.file.filename : null;
        try {
            const newUser = yield (0, user_service_1.addUser)({ name, last_name, nick_name, age, email, password, profile_image: fieldname });
            const message = {
                status: 1,
                name: data_dictionary_1.succesfullMessage.MESSAGE_201_CODE,
                message: data_dictionary_1.succesfullMessage.MESSAGE_201_CODE,
            };
            return res.status(201).json(message);
        }
        catch (error) {
            const { name, message } = error;
            const messageError = {
                status: 0,
                name,
                message,
            };
            return res.status(401).json(messageError);
        }
    });
}
exports.addOneUser = addOneUser;
function updateOneUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, last_name, nick_name, age, email } = req.body;
        const fieldname = req.file ? req.file.filename : null;
        try {
            const updatedUser = yield (0, user_service_1.updateUser)({ name, last_name, nick_name, age, email, profile_image: fieldname });
            if (!updatedUser) {
                error_1.default.createCustomError({
                    name: data_dictionary_1.errorName.TOKEN_NOT_EXISTS_NAME,
                    message: data_dictionary_1.errorMessage.TOKEN_NOT_EXISTS_MESSAGE,
                });
            }
            if (fieldname) {
                (0, utils_1.deleteFile)("/profile_images/" + updatedUser.profile_image);
            }
            const message = {
                status: 1,
                name: data_dictionary_1.succesfullMessage.MESSAGE_200_CODE,
                message: data_dictionary_1.succesfullMessage.MESSAGE_200_CODE,
            };
            return res.status(200).json(message);
        }
        catch (error) {
            const { name, message } = error;
            const messageError = {
                status: 0,
                name,
                message,
            };
            return res.status(401).json(messageError);
        }
    });
}
exports.updateOneUser = updateOneUser;
function changeOnePassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { password } = req.body;
        const { email } = req.user;
        try {
            const newPassword = yield (0, user_service_1.changePassword)(email, password);
            if (!newPassword) {
                error_1.default.createCustomError({
                    name: data_dictionary_1.errorName.CHANGE_PASSWORD_ERROR_NAME,
                    message: data_dictionary_1.errorMessage.CHANGE_PASSWORD_ERROR_MESSAGE,
                });
            }
            const message = {
                status: 1,
                name: data_dictionary_1.succesfullMessage.MESSAGE_200_CODE,
                message: data_dictionary_1.succesfullMessage.MESSAGE_200_CODE,
            };
            return res.status(200).clearCookie("changePJwt").json(message);
        }
        catch (error) {
            const { name, message } = error;
            const messageError = {
                status: 0,
                name,
                message,
            };
            return res.status(401).json(messageError);
        }
    });
}
exports.changeOnePassword = changeOnePassword;
function deleteOneUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = req.body;
        try {
            const deletedUser = yield (0, user_service_1.deleteUser)(email);
            if (!deletedUser) {
                error_1.default.createCustomError({
                    name: data_dictionary_1.errorName.DELETE_USER_ERROR_NAME,
                    message: data_dictionary_1.errorMessage.DELETE_USER_ERROR_MESSAGE,
                });
            }
            (0, utils_1.deleteFile)("/profile_images/" + deletedUser.profile_image);
            const message = {
                status: 1,
                name: data_dictionary_1.succesfullName.DELETE_USER_SUCCESS_NAME,
                message: data_dictionary_1.succesfullMessage.DELETE_USER_SUCCESS_MESSAGE,
            };
            return res.status(200).json(message);
        }
        catch (error) {
            const { name, message } = error;
            const messageError = {
                status: 0,
                name,
                message,
            };
            return res.status(401).json(messageError);
        }
    });
}
exports.deleteOneUser = deleteOneUser;
function sendEmailToChangePassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = req.body;
        try {
            const user = yield (0, user_service_1.getUserByEmail)(email);
            const token = (0, utils_1.generateToken)(user, '10m');
            const htmlEmail = `<h2>Hola ${user.nick_name || user.name}</h2> <h4>Tienes que presionar el boton de abajo para poder cambiar tu contraseña.</h4> <br> <a style="background-color: #008CBA; border-radius: 10px; color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;" href="http://localhost:5173/change-password?changePJwt=${token}" target="_blank">Cambiar contraseña</a>`;
            const mailOptions = {
                from: 'tu_correo@gmail.com',
                to: email,
                subject: 'Cambiar tu contraseña de Vet',
                // html: `<h2>Hola ${user.nick_name || user.name}</h2> <h4>Tienes que presionar el boton de abajo para poder cambiar tu contraseña.</h4> <br> <a style="background-color: #008CBA; border-radius: 10px; color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;" href="http://localhost:5173/change-password" target="_blank">Cambiar contraseña</a>`,
                html: htmlEmail,
            };
            // Enviar el correo electrónico
            nodemailer_1.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    error_1.default.createCustomError({
                        name: data_dictionary_1.errorName.POST_EMAIL_NOT_SEND_NAME,
                        message: data_dictionary_1.errorMessage.POST_EMAIL_NOT_SEND_MESSAGE,
                    });
                }
                else {
                    console.log('Correo enviado: ' + info.response);
                    const message = {
                        status: 1,
                        name: data_dictionary_1.succesfullMessage.POST_EMAIL_SEND_MESSAGE,
                        message: data_dictionary_1.succesfullMessage.POST_EMAIL_SEND_MESSAGE,
                    };
                    return res.status(200).json(message);
                }
            });
        }
        catch (error) {
            const { name, message } = error;
            const messageError = {
                status: 0,
                name,
                message,
            };
            return res.status(403).json(messageError);
        }
    });
}
exports.sendEmailToChangePassword = sendEmailToChangePassword;
function clearTokenLogOut(req, res) {
    return res.clearCookie('tokenJwt').json({
        status: 1,
        name: data_dictionary_1.succesfullName.LOG_OUT_NAME,
        message: data_dictionary_1.succesfullMessage.LOG_OUT_MESSAGE,
    });
}
exports.clearTokenLogOut = clearTokenLogOut;
function getToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (0, utils_1.verifyToken)(req.signedCookies.tokenJwt);
            if (token === null || token === void 0 ? void 0 : token.user) {
                return res.json({
                    status: 1,
                    name: data_dictionary_1.succesfullName.TOKEN_EXISTS_NAME,
                    message: data_dictionary_1.succesfullMessage.TOKEN_EXISTS_MESSAGE,
                });
            }
            return res.status(401).json({
                status: 0,
                name: data_dictionary_1.errorName.TOKEN_NOT_EXISTS_NAME,
                message: data_dictionary_1.errorMessage.TOKEN_NOT_EXISTS_MESSAGE,
            });
        }
        catch (error) {
            // console.log(error instanceof jwt.TokenExpiredError)
            // console.log(error instanceof jwt.JsonWebTokenError)
            const { name, message } = error;
            const messageError = {
                status: 0,
                name,
                message,
            };
            return res.status(401).json(messageError);
        }
    });
}
exports.getToken = getToken;
function generateCookieFromPassport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isOk = !!req.user.message;
            if (!isOk) {
                // const uri: string = 'http://192.168.0.102:5173'
                const token = (0, utils_1.generateToken)(req.user, '1h');
                return res.send(`<script>window.opener.postMessage({ token: '${token}' }, 'http://localhost:5173');window.close();</script>`);
            }
            else {
                return res.send(`<script>window.opener.postMessage({ token: '${null}' }, 'http://localhost:5173');window.close();</script>`);
            }
        }
        catch (err) {
            return res.send(`${req.user.message}`);
        }
    });
}
exports.generateCookieFromPassport = generateCookieFromPassport;
function putCookieFromPassport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { jwtToken } = req.body;
        try {
            const isValid = (0, utils_1.verifyToken)(jwtToken);
            if (isValid) {
                return res.cookie("tokenJwt", jwtToken, { httpOnly: true, maxAge: 1000 * 60 * 60, signed: true }).json({
                    status: 1,
                    name: data_dictionary_1.succesfullName.TOKEN_EXISTS_NAME,
                    message: data_dictionary_1.succesfullMessage.TOKEN_EXISTS_MESSAGE,
                });
            }
        }
        catch (error) {
            const { name, message } = error;
            const messageError = {
                status: 0,
                name,
                message,
            };
            return res.status(400).json(messageError);
        }
    });
}
exports.putCookieFromPassport = putCookieFromPassport;
