import React from 'react';
 // Import the CSS file containing the animation styles
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='w-9/12 mx-auto flex  items-center justify-center'>
      <div className='  h-[35rem]'> </div>
      <div className=' w-10/12 flex  flex-col  mx-auto space-y-10 items-center justify-center'>
        
        <p className=' text-3xl  text-wrap  uppercase'>Empowering Your Shopping Experience, One Click at a Time.</p>
        <div className='   space-x-10'>
          <Link to={"/login"}>
          <button className=' border border-black  bg-black text-white text-xl py-4 px-8 rounded-lg '>
            LOGIN 
          </button>
          </Link>
          <Link to={"/signup"}>
          <button className=' border border-black  bg-black text-white text-xl py-4 px-8 rounded-lg '>
            SIGNUP
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
