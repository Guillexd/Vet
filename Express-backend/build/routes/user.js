"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const user_middleware_1 = require("../middlewares/user.middleware");
const multer_middleware_1 = require("../middlewares/multer.middleware");
const passport_1 = __importDefault(require("passport"));
exports.router = (0, express_1.Router)();
exports.router.get("/", passport_1.default.authenticate("authPassportTokenJwt", { session: false, failWithError: true }), user_controller_1.getAllUsers);
exports.router.post("/login", user_controller_1.getOneUserByEmail);
exports.router.post("/register", passport_1.default.authenticate("authPassportTokenJwt", { session: false, failWithError: true }), multer_middleware_1.uploadCreateProfileImage.single("profile_image"), user_middleware_1.createUserValidator, user_middleware_1.validatedUser, user_controller_1.addOneUser);
exports.router.put("/update-user", passport_1.default.authenticate("authPassportTokenJwt", { session: false, failWithError: true }), multer_middleware_1.uploadUpdateProfileImage.single("profile_image"), user_middleware_1.updateUserValidator, user_middleware_1.validatedUser, user_controller_1.updateOneUser);
exports.router.post("/send-email", user_controller_1.sendEmailToChangePassword);
exports.router.put("/change-password", passport_1.default.authenticate("authPassportChangePJwt", { session: false, failWithError: true }), user_middleware_1.changePasswordValidator, user_middleware_1.validatedUser, user_controller_1.changeOnePassword);
exports.router.delete("/delete-user", passport_1.default.authenticate("authPassportTokenJwt", { session: false, failWithError: true }), user_controller_1.deleteOneUser);
exports.router.get("/logout", user_controller_1.clearTokenLogOut);
exports.router.get("/get-token", user_controller_1.getToken);
exports.router.get("/login-google", passport_1.default.authenticate('googleLogin', { scope: ["email", "profile"] }));
exports.router.get("/google-login", passport_1.default.authenticate("googleLogin", {
    session: false,
}), user_controller_1.generateCookieFromPassport);
exports.router.post("/cookie-passport", user_controller_1.putCookieFromPassport);
