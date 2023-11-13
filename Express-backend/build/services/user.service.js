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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.changePassword = exports.getUserByEmail = exports.updateUser = exports.addUser = exports.getUserByEmailToLogin = exports.getUsers = void 0;
const factory_1 = require("../persistence/daos/factory");
function getUsers(page, limit, filter, inputFilter) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield factory_1.userDao.getUsers(page, limit, filter, inputFilter);
        return users;
    });
}
exports.getUsers = getUsers;
function getUserByEmailToLogin(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield factory_1.userDao.getUserByEmailToLogin(email, password);
        return user;
    });
}
exports.getUserByEmailToLogin = getUserByEmailToLogin;
function addUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = yield factory_1.userDao.addUser(data);
        return newUser;
    });
}
exports.addUser = addUser;
function updateUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedUser = yield factory_1.userDao.updateUser(data);
        return updatedUser;
    });
}
exports.updateUser = updateUser;
function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield factory_1.userDao.getUserByEmail(email);
        return user;
    });
}
exports.getUserByEmail = getUserByEmail;
function changePassword(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield factory_1.userDao.changePassword({ email, password });
        return user;
    });
}
exports.changePassword = changePassword;
function deleteUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield factory_1.userDao.deleteUser(email);
        return user;
    });
}
exports.deleteUser = deleteUser;
