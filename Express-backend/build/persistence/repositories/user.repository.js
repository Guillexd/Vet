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
const error_1 = __importDefault(require("../../utils/error"));
const data_dictionary_1 = require("../../utils/data.dictionary");
const utils_1 = require("../../utils/utils");
const user_dto_1 = require("../dtos/user.dto");
class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }
    getUsers(page, limit, filter, inputFilter) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.dao.getUsers(page, limit, filter, inputFilter);
            const docs = (0, user_dto_1.usersResponse)(users.docs);
            const dataUsers = Object.assign(Object.assign({}, users), { docs });
            return dataUsers;
        });
    }
    getUserByEmailToLogin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDao = yield this.dao.getUserByEmail(email);
            if (!userDao) {
                error_1.default.createCustomError({
                    name: data_dictionary_1.errorName.GET_USER_ERROR,
                    message: data_dictionary_1.errorMessage.GET_USER_ERROR_MESSAGE,
                });
            }
            const isPassword = yield (0, utils_1.comparePassword)(password, userDao.password);
            if (!isPassword) {
                error_1.default.createCustomError({
                    name: data_dictionary_1.errorName.GET_USER_ERROR,
                    message: data_dictionary_1.errorMessage.GET_USER_ERROR_MESSAGE,
                });
            }
            const user = (0, user_dto_1.userResponse)(userDao);
            const token = (0, utils_1.generateToken)(user, '1h');
            return token;
        });
    }
    addUser({ name, last_name, nick_name, age, profile_image, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.dao.getUserByEmail(email);
            if (!!user) {
                error_1.default.createCustomError({
                    name: data_dictionary_1.errorName.POST_NEW_USER_ERROR,
                    message: `El correo ${data_dictionary_1.errorMessage.POST_NEW_USER_BY_FIELD_NOT_UNIQUE}`,
                });
            }
            const hashedPassword = yield (0, utils_1.hashPassord)(password);
            const dataUser = { name, last_name, age, email, password: hashedPassword };
            if (nick_name) {
                dataUser.nick_name = nick_name;
            }
            if (profile_image) {
                dataUser.profile_image = profile_image;
            }
            const newUser = yield this.dao.addUser(dataUser);
            return newUser;
        });
    }
    updateUser({ name, last_name, nick_name, age, profile_image, email }) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataUser = { name, last_name, age, email };
            if (nick_name) {
                dataUser.nick_name = nick_name;
            }
            if (profile_image) {
                dataUser.profile_image = profile_image;
            }
            const newUser = yield this.dao.updateUser(dataUser);
            return newUser;
        });
    }
    changePassword({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield (0, utils_1.hashPassord)(password);
            const updatedUser = yield this.dao.changePassword({ email, password: hashedPassword });
            return updatedUser;
        });
    }
    deleteUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.dao.deleteUser(email);
            return user;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDao = yield this.dao.getUserByEmail(email);
            if (!userDao) {
                error_1.default.createCustomError({
                    name: data_dictionary_1.errorName.GET_USER_BY_EMAIL_TO_CHANGE_PASSWORD_NAME,
                    message: data_dictionary_1.errorMessage.GET_USER_BY_EMAIL_TO_CHANGE_PASSWORD_MESSAGE,
                });
            }
            const user = (0, user_dto_1.userResponse)(userDao);
            return user;
        });
    }
}
exports.default = UserRepository;
