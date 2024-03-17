import { useState } from 'react'
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import './App.css'
import { Route, Routes} from "react-router-dom"
import { Login } from './components/Login'
import VerifyEmail from './components/VerifyEmail'
import Home from './components/Home'
import Categories from './components/Categories'
import PrivateRoute from './components/PrivateRoute'
import Error from './components/Error'
function App() {
  

  return (
    <div>
      <Navbar/>
      
      <Routes>
        <Route path ='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/verify-email' element={<VerifyEmail/>}/>
        <Route path='/categories' element={
                                      <PrivateRoute>
                                       <Categories/>
                                      </PrivateRoute>}/> 
        <Route path="*"  element ={<Error/>}/>
      </Routes>
    </div>
  )
}

export default App
