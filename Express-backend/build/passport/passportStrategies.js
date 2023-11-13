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
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const env_1 = __importDefault(require("../utils/env"));
const user_service_1 = require("../services/user.service");
const cookieExtractorTokenJwt = (req) => {
    const token = req.signedCookies.tokenJwt;
    return token;
};
passport_1.default.use("authPassportTokenJwt", new passport_jwt_1.Strategy({
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([cookieExtractorTokenJwt]),
    secretOrKey: env_1.default.secret_key_jwt,
}, (jwtPayload, done) => __awaiter(void 0, void 0, void 0, function* () {
    if (!jwtPayload.user) {
        return done(null, false);
    }
    return done(null, jwtPayload.user);
})));
const cookieExtractorChangePJwt = (req) => {
    const token = req.query.changePJwt;
    return typeof token === 'string' ? token : null;
};
passport_1.default.use("authPassportChangePJwt", new passport_jwt_1.Strategy({
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([cookieExtractorChangePJwt]),
    secretOrKey: env_1.default.secret_key_jwt,
}, (jwtPayload, done) => __awaiter(void 0, void 0, void 0, function* () {
    if (!jwtPayload.user) {
        return done(null, false);
    }
    return done(null, jwtPayload.user);
})));
passport_1.default.use("googleLogin", new passport_google_oauth20_1.Strategy({
    clientID: env_1.default.google_login_client_id,
    clientSecret: env_1.default.google_login_client_secret,
    callbackURL: "/user/google-login",
    passReqToCallback: true,
    scope: ["profile", "email"],
}, (req, accessToken, refreshToken, profile, cb) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_service_1.getUserByEmail)(profile._json.email);
        cb(null, user);
    }
    catch (error) {
        const newError = {
            name: error.name,
            message: error.message,
        };
        cb(null, newError);
    }
})));
