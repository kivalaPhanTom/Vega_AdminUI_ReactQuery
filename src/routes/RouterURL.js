import React from 'react'
import {
    Routes,
    Route,
} from 'react-router-dom'
import ForgotPassword from '../components/ForgotPassword/ForgotPassword'
import Login from '../components/Login/Login'
import Register from '../components/Register/Register'

function RouterURL(props) {
  return (
    <div>
    <Routes>
        <Route exact path="/login" element={<Login/>}></Route>    
        <Route exact path="/register" element={<Register/> }></Route>   
        <Route exact path="/forgot" element={<ForgotPassword/> }></Route>         
    </Routes> 
</div>
  )
}



export default RouterURL
