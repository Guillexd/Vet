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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../../mongoDB/models/user.model");
class UserManager {
    getUsers(page, limit, filter, inputFilter) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryFilter = {};
            if (filter === 'age' && (typeof parseInt(inputFilter) == 'number') && inputFilter.length > 0) {
                queryFilter[filter] = { $eq: parseInt(inputFilter) };
            }
            else if (filter === 'age') {
                queryFilter[filter] = { $gte: -1 };
            }
            else {
                queryFilter[filter] = { $regex: inputFilter, $options: "i" };
            }
            console.log(queryFilter);
            const users = yield user_model_1.userModel.paginate(queryFilter, { sort: { createdAt: -1 }, limit, page });
            return users;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.userModel.findOne({ email });
            return user;
        });
    }
    addUser(dataUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.userModel.create(dataUser);
            return user;
        });
    }
    updateUser(_a) {
        var { email } = _a, dataUser = __rest(_a, ["email"]);
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.userModel.findOneAndUpdate({ email }, dataUser);
            return user;
        });
    }
    changePassword({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.userModel.findOneAndUpdate({ email }, { password }, { new: true });
            return user;
        });
    }
    deleteUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.userModel.findOneAndDelete({ email });
            return user;
        });
    }
}
exports.default = UserManager;
class UserPremiunManager extends UserManager {
}
