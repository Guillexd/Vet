import { Request } from "express";
import passport from "passport"
import {ExtractJwt, Strategy as jwtStrategy } from "passport-jwt"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import env from "../utils/env";
import { getUserByEmail } from "../services/user.service";
const cookieExtractorTokenJwt = (req: Request) => {
    const token = req.signedCookies.tokenJwt
    console.log(req);
    console.log('El token  xd:' + token);
    return token
}

passport.use(
    "authPassportTokenJwt",
    new jwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractorTokenJwt]),
            secretOrKey: env.secret_key_jwt,
        },
        async (jwtPayload, done) => {
            if (!jwtPayload.user) {
                return done(null, false);
            }
            return done(null, jwtPayload.user)
        }
    )
)

const cookieExtractorChangePJwt = (req: Request) => {
    const token = req.query.changePJwt
    return typeof token === 'string' ? token : null;
}

passport.use(
    "authPassportChangePJwt",
    new jwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractorChangePJwt]),
            secretOrKey: env.secret_key_jwt, 
        },
        async (jwtPayload, done) => {
            if (!jwtPayload.user) {
                return done(null, false);
            }
            return done(null, jwtPayload.user)
        }
    )
)

passport.use(
    "googleLogin",
    new GoogleStrategy(
      {
        clientID: env.google_login_client_id!,
        clientSecret: env.google_login_client_secret!,
        callbackURL: "/user/google-login",
        passReqToCallback: true,
        scope: ["profile", "email"],
      },
      async (req, accessToken, refreshToken, profile, cb) => {
        try {
          const user = await getUserByEmail(<string>profile._json.email);
          
          cb(null, user)
        } catch (error: any) {
            const newError = {
                name: error.name,
                message: error.message,
            }
            cb(null, newError)
        }
      }
    )
  )
