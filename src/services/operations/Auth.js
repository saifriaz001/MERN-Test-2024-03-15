import {ToastBar, toast} from "react-hot-toast"
import { endpoints } from "../api";
import { setLoading, setToken } from "../../slices/authSlice";
import { apiConnector } from "../apiconnector";
 const{
   SENDOTP_API,
    SIGNUP_API,
    LOGIN_API
 }= endpoints

 export function sendotp(email ,navigate){
    return async(dispatch) =>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST" , SENDOTP_API,{
                email,

            })
             console.log("SENDOTP API RESPONSE ........." , response)       
            
            console.log(response.data.success)
            if(!response.data.success){
                throw new Error (Response.data.message)
            }
            toast.success("OTP Sent Successfully")
            navigate("/verify-email")
            
        } catch (error) {
            console.log("SENDOTP API ERROR....." , error)
            toast.error("Could Not Send OTP")


        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)

    }
 }

 export function signup(
    name ,
    email,
    password,
    confirmPassword,
    otp,
    navigate
 ){
    return async (dispatch)=>{
        const toastId = toast.loading("Loading...")

        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST" , SIGNUP_API,{
                name ,
                email,
                password,
                confirmPassword,
                otp,
            })
            console.log("SIGNUP API RESPONSE......" , response)
            if(!response.data.success){
                throw new Error (response.data.message)
            }
            toast.success("Login Successful")
            navigate("/login")
        } catch (error) {
            console.log("SIGNUP API ERROR......." , error)
            toast.error("Wrong OTP")
            navigate("/signup")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function login( email , password , navigate){
    return async (dispatch) =>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try{
            console.log(" your email is ->" ,email)
            const response = await apiConnector("POST" , LOGIN_API ,{
                email,
                 password,
            })
            console.log("LOGIN API RESPONSE ....." , response)

            if(!response.data.success){
                throw new Error (response.data.message)
            }
            toast.success("Login Successful")
            dispatch(setToken(response.data.token))
            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))
            navigate("/categories") 
        } catch(error){
            console.log("LOGIN API ERROR...." , error)

        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)

    }
}

export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      
      
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/")
    }
  }
 