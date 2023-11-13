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
exports.deleteFile = exports.joinSrcDir = exports.verifyToken = exports.generateToken = exports.comparePassword = exports.hashPassord = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const path_1 = require("path");
const fs_1 = require("fs");
const env_1 = __importDefault(require("./env"));
const hashPassord = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, bcrypt_1.hash)(password, 10);
});
exports.hashPassord = hashPassord;
const comparePassword = (password, hashedPassowrd) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, bcrypt_1.compare)(password, hashedPassowrd);
});
exports.comparePassword = comparePassword;
const generateToken = (user, timeToExpire) => {
    const token = (0, jsonwebtoken_1.sign)({ user }, env_1.default.secret_key_jwt, { expiresIn: timeToExpire });
    return token;
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    const tokenGenerated = (0, jsonwebtoken_1.verify)(token, env_1.default.secret_key_jwt);
    return tokenGenerated;
};
exports.verifyToken = verifyToken;
const joinSrcDir = (path) => {
    return (0, path_1.join)(__dirname, "../" + path);
};
exports.joinSrcDir = joinSrcDir;
const deleteFile = (path) => {
    const newPath = (0, exports.joinSrcDir)("/public" + path);
    if ((0, fs_1.existsSync)(newPath)) {
        (0, fs_1.unlink)(newPath, (err) => {
            if (err) {
                console.error('Error al eliminar el archivo anterior:', err);
            }
            else {
                console.log('Archivo anterior eliminado con éxito');
            }
        });
    }
};
exports.deleteFile = deleteFile;
