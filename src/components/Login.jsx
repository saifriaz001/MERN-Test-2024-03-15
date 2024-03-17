import React, { useState } from 'react';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/operations/Auth';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;
  const [showPassword, setShowPassword] = useState(false);

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
    setFormData({
      email: '',
      password: ''
    });
  };

  return (
    <div className="w-full lg:w-7/12 mx-auto">
      <div className="h-20" />
      <div className="w-3/5 mx-auto items-center justify-between border rounded-lg border-gray-300 p-5">
        <div className="text-4xl flex items-center justify-center font-semibold mt-5">Login</div>
        <div className="flex mx-auto items-center justify-center mt-5 text-3xl">Welcome back to ECOMMERCE</div>
        <div className="flex mx-auto items-center justify-center mt-3 text-lg">The next gen business marketplace</div>
        <form onSubmit={onSubmit} className="mt-5">
          <label className="w-full flex flex-col items-start justify-between">
            <p className="mb-1 text-sm leading-tight text-black mx-1">Email<sup className="text-red-900">*</sup></p>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChangeHandler}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md p-3"
            />
          </label>
          <label className="w-full flex flex-col items-start mt-5 justify-between relative">
            <p className="mb-1 text-sm leading-tight text-black mx-1">Password<sup className="text-red-900">*</sup></p>
            <input
              type={showPassword ? 'password' :'text' }
              name="password"
              value={password}
              onChange={onChangeHandler}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-md p-3"
            />
            <span className="absolute top-10 right-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <GoEyeClosed /> : <GoEye /> } 
            </span>
          </label>
          <button type="submit" className="mt-5 w-full bg-black text-white rounded-md p-3">
            LOGIN
          </button>
        </form>
        <div className="w-full  h-[0.1rem] bg-gray-300 mt-5" />
        <div className="flex mx-auto items-center justify-center mt-3 text-sm mb-5 space-x-1">
          <p>Don't have an Account?</p>
          <Link to="/signup">
            <p className="text-black font-semibold">SIGN UP</p>
          </Link>
        </div>
      </div>
    </div>
  );
};