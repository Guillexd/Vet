export const errorName = {
    GET_USER_ERROR: "Error in get one user",
    POST_NEW_USER_ERROR: "Error in user",
    GET_USER_BY_EMAIL_TO_CHANGE_PASSWORD_NAME: "Error in get user by email",
    POST_EMAIL_NOT_SEND_NAME: "Error in send a email",
    TOKEN_NOT_EXISTS_NAME: "No hay token",
    CHANGE_PASSWORD_ERROR_NAME: "Error en cambiar contraseña",
    DELETE_USER_ERROR_NAME: "Usuario corrupto",
}

export const errorMessage = {
    GET_USER_ERROR_MESSAGE: "El correo o la contraseña son incorrectas.",
    POST_NEW_USER_BY_EMPTY_FIELD_ERROR: "debe ser rellenado",
    POST_NEW_USER_BY_TYPE_FIELD_ERROR: "debe ser",
    POST_NEW_USER_BY_FIELD_NOT_UNIQUE: "ya existe.",
    GET_USER_BY_EMAIL_TO_CHANGE_PASSWORD_MESSAGE: "El correo no existe o es incorrecto.",
    POST_EMAIL_NOT_SEND_MESSAGE: "No se pudo enviar el correo.",
    TOKEN_NOT_EXISTS_MESSAGE: "El tiempo de sesión ha expirado.",
    CHANGE_PASSWORD_ERROR_MESSAGE: "Sesión expirada.",
    DELETE_USER_ERROR_MESSAGE: "No se pudo eliminar el usuario",
}

export const succesfullName = {
    GET_USER_SUCCESS_NAME: "Usuario logeado.",
    POST_USER_SUCCESS_NAME: "Usuario creado.",
    POST_EMAIL_SEND_NAME: "Mensaje enviado.",
    TOKEN_EXISTS_NAME: "Token existe.",
    CHANGE_PASSWORD_SUCCESS_NAME: "",
    LOG_OUT_NAME: "Cerrando sesión.",
    DELETE_USER_SUCCESS_NAME: "Usuario eliminado.",
}

export const succesfullMessage = {
    MESSAGE_200_CODE: "Tarea hecha exitosamente.",
    MESSAGE_201_CODE: "Datos creados exitosamente.",   
    POST_EMAIL_SEND_MESSAGE: "El correo fue enviado a su cuenta de gmail.",
    TOKEN_EXISTS_MESSAGE: "El token existe y es usable.",
    CHANGE_PASSWORD_SUCCESS_MESSAGE: "",
    LOG_OUT_MESSAGE: 'Cierre de sesión exitoso.',
    DELETE_USER_SUCCESS_MESSAGE: "El usuario fue eliminado exitosamente.",
}