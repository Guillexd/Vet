"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const data_dictionary_1 = require("../utils/data.dictionary");
const errorMiddleware = (error, req, res, next) => {
    const { name, message } = error;
    const messageError = {
        status: 0,
        name: name === 'AuthenticationError' ? data_dictionary_1.errorName.TOKEN_NOT_EXISTS_NAME : name,
        message: message === 'Unauthorized' ? data_dictionary_1.errorMessage.TOKEN_NOT_EXISTS_MESSAGE : message,
    };
    return res.status(400).json(messageError);
};
exports.errorMiddleware = errorMiddleware;
