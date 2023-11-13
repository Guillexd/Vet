"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError {
    static createCustomError({ name, message }) {
        const newError = new Error(message);
        newError.name = name;
        throw newError;
    }
}
exports.default = CustomError;
