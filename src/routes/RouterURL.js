import React, { Suspense }from 'react'
import {
    Routes,
    Route,
} from 'react-router-dom'
import LayoutAdmin from '../components/ADMIN/LayoutAdmin/LayoutAdmin';
// import Reports from '../components/ADMIN/Reports/Reports';
// import Users from '../components/ADMIN/Users/Users';
// import Products from '../components/ADMIN/Products/Products';
// import MainGroup from '../components/ADMIN/MainGroup/MainGroup';
import Layout from '../components/Layout/Layout'
import Loading from '../components/Loading/Loading'

import PrivateRoute from './PrivateRoute';

const Login = React.lazy(() => {
  return new Promise( resolve=> setTimeout(resolve,1.5*1000)).then(()=> import('../components/Login/Login'))
});
const Register = React.lazy(() => {
  return new Promise( resolve=> setTimeout(resolve,1.5*1000)).then(()=> import('../components/Register/Register'))
});
const ForgotPassword = React.lazy(() => {
  return new Promise( resolve=> setTimeout(resolve,1.5*1000)).then(()=> import('../components/ForgotPassword/ForgotPassword'))
});

const MainGroup = React.lazy(() => {
  return new Promise( resolve=> setTimeout(resolve,1.5*1000)).then(()=> import('../components/ADMIN/MainGroup/MainGroup'))
});

const Products = React.lazy(() => {
  return new Promise( resolve=> setTimeout(resolve,1.5*1000)).then(()=> import('../components/ADMIN/Products/Products'))
});

const Users = React.lazy(() => {
  return new Promise( resolve=> setTimeout(resolve,1.5*1000)).then(()=> import('../components/ADMIN/Users/Users'))
});
const Reports = React.lazy(() => {
  return new Promise( resolve=> setTimeout(resolve,1.5*1000)).then(()=> import('../components/ADMIN/Reports/Reports'))
});
// const LayoutAdmin = React.lazy(() => {
//   return new Promise( resolve=> setTimeout(resolve,1.5*1000)).then(()=> import('../components/ADMIN/LayoutAdmin/LayoutAdmin'))
// });

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
                <Route exact path="/adminVega" 
                        element={ 
                            <PrivateRoute >
                                {/* <Layout component_ui={<CheckinCheckout/>} /> */}
                                <LayoutAdmin/>
                            </PrivateRoute>
                        }
                >
                </Route>
                <Route exact path="/adminVega/mainGroups" 
                        element={ 
                          <LayoutAdmin component_ui={<MainGroup/>}/>
                        }
                >
                </Route>  
                <Route exact path="/adminVega/products" 
                        element={ 
                          <LayoutAdmin component_ui={<Products/>}/>
                        }
                >
                </Route>  
                <Route exact path="/adminVega/users" 
                        element={ 
                          <LayoutAdmin component_ui={<Users/>}/>
                        }
                >
                </Route> 
                <Route exact path="/adminVega/reports" 
                        element={ 
                          <LayoutAdmin component_ui={<Reports/>}/>
                        }
                >
                </Route>  
               
                
                
            </Routes> 
        </Suspense>
    </div>
  )
}



export default RouterURL
