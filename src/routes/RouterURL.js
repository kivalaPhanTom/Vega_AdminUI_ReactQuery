import React, { Suspense }from 'react'
import {
    Routes,
    Route,
} from 'react-router-dom'
// import ForgotPassword from '../components/ForgotPassword/ForgotPassword'
import Layout from '../components/Layout/Layout'
import Loading from '../components/Loading/Loading'
// import Login from '../components/Login/Login'
// import Register from '../components/Register/Register'
import PrivateRoute from './PrivateRoute';
// const Login = React.lazy(() => import('../components/Login/Login'));
const Login = React.lazy(() => {
  return new Promise( resolve=> setTimeout(resolve,1.5*1000)).then(()=> import('../components/Login/Login'))
});
const Register = React.lazy(() => {
  return new Promise( resolve=> setTimeout(resolve,1.5*1000)).then(()=> import('../components/Register/Register'))
});
const ForgotPassword = React.lazy(() => {
  return new Promise( resolve=> setTimeout(resolve,1.5*1000)).then(()=> import('../components/ForgotPassword/ForgotPassword'))
});

function RouterURL(props) {
  return (
    <div>
        <Suspense fallback={<Loading/>}>
            <Routes>
                <Route exact path="/login" element={<Login/>}></Route>    
                <Route exact path="/register" element={<Register/> }></Route>   
                <Route exact path="/forgot" element={<ForgotPassword/> }></Route>      

                <Route exact path="/" 
                        element={ 
                            <PrivateRoute >
                                {/* <Layout component_ui={<CheckinCheckout/>} /> */}
                                <Layout />
                            </PrivateRoute>
                        }
                >
                </Route>   
            </Routes> 
        </Suspense>
    </div>
  )
}



export default RouterURL
