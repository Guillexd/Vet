"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersResponse = exports.userResponse = void 0;
const env_1 = __importDefault(require("../../utils/env"));
const userResponse = ({ _doc }) => {
    if (env_1.default.persistence === "MONGO") {
        delete _doc.password;
        delete _doc.__v;
        delete _doc.createdAt;
        delete _doc.updatedAt;
        return _doc;
    }
};
exports.userResponse = userResponse;
const usersResponse = (docs) => {
    if (env_1.default.persistence === "MONGO") {
        const data = docs.map((user) => {
            const _doc = Object.assign({}, user._doc);
            delete _doc.password;
            delete _doc.__v;
            delete _doc.updatedAt;
            return _doc;
        });
        return data;
    }
};
exports.usersResponse = usersResponse;
