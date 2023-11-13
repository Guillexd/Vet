import { Router } from "express"
import { addOneUser, getOneUserByEmail, updateOneUser, getToken, sendEmailToChangePassword, changeOnePassword, generateCookieFromPassport, putCookieFromPassport, clearTokenLogOut, getAllUsers, deleteOneUser } from "../controllers/user.controller"
import { createUserValidator, validatedUser, updateUserValidator, changePasswordValidator } from "../middlewares/user.middleware"
import { uploadCreateProfileImage, uploadUpdateProfileImage } from "../middlewares/multer.middleware"
import passport from "passport"

export const router = Router()

router.get("/", passport.authenticate("authPassportTokenJwt", { session: false, failWithError: true }), getAllUsers)

router.post("/login", getOneUserByEmail)

router.post("/register", passport.authenticate("authPassportTokenJwt", { session: false, failWithError: true }), uploadCreateProfileImage.single("profile_image"), createUserValidator, validatedUser, addOneUser)

router.put("/update-user", passport.authenticate("authPassportTokenJwt", { session: false, failWithError: true }), uploadUpdateProfileImage.single("profile_image"), updateUserValidator, validatedUser, updateOneUser)

router.post("/send-email", sendEmailToChangePassword)

router.put("/change-password", passport.authenticate("authPassportChangePJwt", { session: false, failWithError: true }), changePasswordValidator, validatedUser, changeOnePassword)
  
router.delete("/delete-user", passport.authenticate("authPassportTokenJwt", { session: false, failWithError: true }), deleteOneUser)

router.get("/logout", clearTokenLogOut)

router.get("/get-token", getToken)

router.get(
    "/login-google",
    passport.authenticate('googleLogin', { scope: ["email", "profile"] })
)
router.get(
    "/google-login",
    passport.authenticate("googleLogin", {
        session: false,
    }),
    generateCookieFromPassport
)

router.post("/cookie-passport", putCookieFromPassport)