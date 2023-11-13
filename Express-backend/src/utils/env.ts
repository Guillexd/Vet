import "dotenv/config"

export default {
    port: process.env.PORT,
    secret_key_jwt: process.env.SECRET_KEY_JWT,
    mongo_uri: process.env.MONGO_URI,
    persistence: process.env.PERSISTENCE,
    signature_cookie: process.env.SIGNATURE_COOKIE,
    email_user: process.env.EMAIL_USER,
    email_pass: process.env.EMAIL_PASS,
    google_login_client_id: process.env.GOOGLE_LOGIN_CLIENT_ID,
    google_login_client_secret: process.env.GOOGLE_LOGIN_CLIENT_SECRET,
    host: process.env.HOST,
}