const BASE_URL = process.env.REACT_APP_BASE_URL

export const endpoints ={
    SENDOTP_API :BASE_URL+"/auth/sendotp",
    SIGNUP_API :BASE_URL +"/auth/signup",
    LOGIN_API: BASE_URL +"/auth/login",
    REMOVE_API : BASE_URL+"/auth/remove",
    ADD_API: BASE_URL+"/auth/add"

}
