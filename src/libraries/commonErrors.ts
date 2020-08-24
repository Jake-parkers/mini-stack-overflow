export enum CommonErrors {
    SERVER_ERROR = "A server error occurred",
  
    BAD_PARAMETERS = "Ensure you are passing the right parameters",
  
    USER_EXISTS = "A user with this email already exists",

    DATABASE_ERROR = "An error occurred with the database",

    UNSUCCESSFUL_SIGNUP = "Could not register user",

    INVALID_USER = "User does not exist",

    INVALID_PASSWORD = "Password is not valid",

    ASK_ERROR = "Error while asking question",

    AUTH_HEADER_MISSING = "No authorization header",

    INVALID_TOKEN = "Invalid Token",

    INVALID_TOKEN_TYPE = "Invalid Token Type",

    UNAUTHORIZED = "User is not authorized to access resource"
}