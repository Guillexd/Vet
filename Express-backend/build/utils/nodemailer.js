"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = __importDefault(require("./env"));
exports.transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: env_1.default.email_user,
        pass: env_1.default.email_pass,
    }
});
