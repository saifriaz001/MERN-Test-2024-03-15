import  { useState } from 'react';
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { sendotp  } from '../services/operations/Auth';
import { setSignupData } from '../slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const SignUp = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  //Handle input fields , when some value changes
  const HandlerOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

 //Handle Form Submission
  const onSubmit = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      console.log ("wrong Password")
    }
      
     const signupData ={
      ...formData,
     }
     //setting signup data to state
     //To be used after OTP verification 
     dispatch (setSignupData(signupData))
     //Send OTP to user for verfication
     dispatch(sendotp(formData.email , navigate))
    //Reset
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className=' w-7/12 mx-auto '>
      <div className=' h-10'></div>
      <div
      style={{borderColor: 'rgba(193, 193, 193, 1)'}}
      className='   w-3/5  mx-auto items-center justify-between border  rounded-lg'>
      <div
      className=' flex mx-auto items-center justify-center text-[32px] mt-5 '
      >Create your account</div>
      <form onSubmit={onSubmit}>
        <label  className='w-full flex  flex-col items-start justify-between mt-5'>
          <p
          className="mb-1 text-[0.875rem] leading-[1.375rem]
          text-black  items-start  mx-14 "
          >Name<sup className=' text-pink-700'>*</sup></p>
          <input
            type="text"
            value={name}
            name='name'
            onChange={HandlerOnChange}
            placeholder='Enter your name'
            style={{borderColor: 'rgba(193, 193, 193, 1)'}}
            className="  w-4/5 mx-auto items-center justify-center rounded-[0.5rem]  border
            p-[12px] text-black"
          />
        </label>
        <label className='w-full flex  flex-col items-start justify-between mt-5'>
          <p
          className="mb-1 text-[0.875rem] leading-[1.375rem]
          text-black  items-start  mx-14 "
          >Email<sup className=' text-pink-600'>*</sup></p>
          <input
            type="email"
            name='email'
            value={email}
            onChange={HandlerOnChange}
            placeholder='Enter your email'
            style={{borderColor: 'rgba(193, 193, 193, 1)'}}
            className="  w-4/5 mx-auto items-center justify-center rounded-[0.5rem]  border
            p-[12px] text-black"
          />
        </label>
        <label className=' relative w-full flex  flex-col items-start justify-between mt-5'>
          <p 
          className="mb-1 text-[0.875rem] leading-[1.375rem]
          text-black  items-start  mx-14 "
          >Password <sup className=' text-pink-700'>*</sup></p>
          <input
            type={showPassword ? "text" : "password"}
            name='password'
            value={password}
            onChange={HandlerOnChange}
            placeholder='Enter your password'
            style={{borderColor: 'rgba(193, 193, 193, 1)'}}
            className="  w-4/5 mx-auto items-center justify-center rounded-[0.5rem]  border
            p-[12px] text-black"
          />
          <span className=' absolute mx-[28rem] mt-[2.7rem]'
           onClick={()=>setShowPassword((prev)=>!prev)}>
            {showPassword?(<GoEye/>):(<GoEyeClosed/>)}

          </span>
        </label>
        <label className='relative w-full flex  flex-col items-start justify-between mt-5'>
          <p
          className="mb-1 text-[0.875rem] leading-[1.375rem]
          text-black  items-start  mx-14 ">Confirm Password<sup className=' text-pink-700'>*</sup></p>
          <input
          name='confirmPassword'
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={HandlerOnChange}
            placeholder='Confirm your password'
            style={{borderColor: 'rgba(193, 193, 193, 1)'}}
            className="  w-4/5 mx-auto items-center justify-center rounded-[0.5rem]  border
            p-[12px] text-black"
          />
          <span className='absolute mx-[28rem] mt-[2.7rem]' 
          onClick={()=>setShowConfirmPassword((prev)=>!prev)} >
            {showConfirmPassword? (<GoEye/>) :(<GoEyeClosed/>)}
          </span>
        </label>
        <button
        className=" mt-5  w-4/5 flex  mx-auto items-center justify-center rounded-[0.5rem]  bg-black p-[12px] text-white"
        type="submit">Submit</button>
      </form>
      <div 
         style={{backgroundColor: 'rgba(193, 193, 193, 1)'}}
        className='className=" mt-5  w-4/5 flex  mx-auto items-center justify-center p-[0.01rem] bg-grey'>
        </div>
        <div className=' flex mx-auto items-center justify-center mt-3 text-sm mb-5 space-x-1' >
            <p>Have an Account?</p>
            <Link to="/login">
                <p className='text-black font-semibold'>LOGIN</p>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp;