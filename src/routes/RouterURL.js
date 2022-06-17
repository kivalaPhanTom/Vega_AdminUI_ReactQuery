import React from 'react'
import {
    Routes,
    Route,
} from 'react-router-dom'
import ForgotPassword from '../components/ForgotPassword/ForgotPassword'
import Layout from '../components/Layout/Layout'
import Login from '../components/Login/Login'
import Register from '../components/Register/Register'
import PrivateRoute from './PrivateRoute';
function RouterURL(props) {
  return (
    <div>
    <Routes>
        <Route exact path="/login" element={<Login/>}></Route>    
        <Route exact path="/register" element={<Register/> }></Route>   
        <Route exact path="/forgot" element={<ForgotPassword/> }></Route>      

          <Route exact path="/" 
                       element={ 
                        <PrivateRoute >
                           {/* <Layout component_ui={<CheckinCheckout/>} /> */}
                           <Layout />
                        </PrivateRoute>}>
                </Route>   
    </Routes> 
</div>
  )
}



export default RouterURL
