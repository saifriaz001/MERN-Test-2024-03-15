import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input'
import {Link} from "react-router-dom"
import { useDispatch , useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { sendotp , signup } from '../services/operations/Auth'
const VerifyEmail = () => {
    const [ otp , setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {signupData , loading} = useSelector((state)=>state.auth);
    useEffect(()=>{
        //Only allow access of this route when user has filled the signup form
        if(!signupData){
            navigate("/signup");
        }
        },[])

        const handlerVerifyAndSignup =(e)=>{
            e.preventDefault();
            const{
                name ,
                 email,
                password,
                confirmPassword

            } =signupData;

            dispatch(
                signup(
                    name,
                    email,
                    password,
                    confirmPassword,
                    otp,
                    navigate
                )
            );
        };
  return (
    <div className=' w-9/12 mx-auto'>
        <div className=' h-10'></div>
      <div style={{
        borderColor: 'rgba(193, 193, 193, 1)',
      }}
      className='   w-3/5 flex flex-col  mx-auto items-center justify-between border   rounded-lg'>
        <div className=' flex mx-auto items-center justify-center text-[32px] mt-5 '>
            Verify your email
        </div>
        <div className=' flex mx-auto items-center justify-center mt-5  text-[16px] text-xl'>
            {`Enter the 8 digit code you have received on  ${signupData.email}` }
        </div>
        <form onSubmit={handlerVerifyAndSignup}>
        <label className=' space-y-3'>
                <p className='flex  mx-4 items-start text-[16px]'>
                    Code
                </p>
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={8}
            renderInput={(props)=>(
                <input
                  {...props}
                   placeholder="-"
                   style={{
                    border:" 1px solid rgba(193, 193, 193, 1)",
                  }}
                   className="w-[40px] h-[40px]  rounded-md  mx-auto flex  "
                   />
            )}
            containerStyle={{
                
                gap:'0 6px',
            }}
            />
            
            </label>
            <button type="submit" 
            className=" mt-5  w-4/5 flex  mx-auto items-center justify-center rounded-[0.5rem] mb-10 bg-black p-[12px] text-white"
            >
                VERIFY
            </button>
        </form>
       </div>
    </div>
  )
}

export default VerifyEmail