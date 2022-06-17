import React,{useState,useEffect} from 'react'
import { Navigate, useLocation } from "react-router-dom"
// import { MethodCommon } from '../commons/methods'
function PrivateRoute(props) {
    const {children}=props
    // var isAuthencate= MethodCommon.check_authenticate()
    return (
        <div>
            {/* { isAuthencate === true ? (children): <Navigate to="/login" />} */}
            {children}
        </div>
    )
  
}
export default PrivateRoute

