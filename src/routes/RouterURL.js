import React, { Suspense }from 'react'
import {
    Routes,
    Route,
} from 'react-router-dom'
// import Employees from '../components/Employees/Employees';
import LayoutAdmin from '../components/LayoutAdmin/LayoutAdmin';
// import Status from '../components/ADMIN/Status/Status';
// import UserRoles from '../components/ADMIN/UserRoles/UserRoles';
// import Reports from '../components/ADMIN/Reports/Reports';
// import Users from '../components/ADMIN/Users/Users';
// import Products from '../components/ADMIN/Products/Products';
// import MainGroup from '../components/ADMIN/MainGroup/MainGroup';
import Loading from '../components/Loading/Loading'

import PrivateRoute from './PrivateRoute';
const TIME = 1.5*1000
const Login = React.lazy(() => {
  return new Promise( resolve=> setTimeout(resolve, TIME)).then(()=> import('../components/Login/Login'))
});
const Register = React.lazy(() => {
  return new Promise( resolve=> setTimeout(resolve, TIME)).then(()=> import('../components/Register/Register'))
});
const ForgotPassword = React.lazy(() => {
  return new Promise( resolve=> setTimeout(resolve, TIME)).then(()=> import('../components/ForgotPassword/ForgotPassword'))
});

const MainGroup = React.lazy(() => {
  return new Promise( resolve=> setTimeout(resolve, TIME)).then(()=> import('../components/MainGroup/MainGroup'))
});

const Products = React.lazy(() => {
  return new Promise( resolve=> setTimeout(resolve, TIME)).then(()=> import('../components/Products/Products'))
});

// const Users = React.lazy(() => {
//   return new Promise( resolve=> setTimeout(resolve,1.5*1000)).then(()=> import('../components/Users/Users'))
// });
const Reports = React.lazy(() => {
  return new Promise( resolve=> setTimeout(resolve, TIME)).then(()=> import('../components/Reports/Reports'))
});

const UserRoles = React.lazy(() => {
  return new Promise( resolve=> setTimeout(resolve, TIME)).then(()=> import('../components/UserRoles/UserRoles'))
});
const Status = React.lazy(() => {
  return new Promise( resolve=> setTimeout(resolve, TIME)).then(()=> import('../components/Status/Status'))
});
const Employees = React.lazy(() => {
  return new Promise( resolve=> setTimeout(resolve, TIME)).then(()=> import('../components/Employees/Employees'))
});
// const LayoutAdmin = React.lazy(() => {
//   return new Promise( resolve=> setTimeout(resolve,1.5*1000)).then(()=> import('../components/LayoutAdmin/LayoutAdmin'))
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
                                {/* <Layout /> */}
                                <LayoutAdmin component_ui={<Reports/>}/>
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
                {/* <Route exact path="/adminVega/employees" 
                        element={ 
                          <LayoutAdmin component_ui={<Users/>}/>
                        }
                >
                </Route>  */}
                <Route exact path="/adminVega/usersRoles" 
                        element={ 
                          <LayoutAdmin component_ui={<UserRoles/>}/>
                        }
                >
                </Route> 
                <Route exact path="/adminVega/status" 
                        element={ 
                          <LayoutAdmin component_ui={<Status/>}/>
                        }
                >
                </Route> 
                <Route exact path="/adminVega/reports" 
                        element={ 
                          <LayoutAdmin component_ui={<Reports/>}/>
                        }
                >
                </Route>  
                <Route exact path="/adminVega/employees" 
                        element={ 
                          <LayoutAdmin component_ui={<Employees/>}/>
                        }
                >
                </Route>  
                {/* <Route exact path="/adminVega/reports" 
                        element={ 
                          <LayoutAdmin component_ui={<Reports/>}/>
                        }
                >
                </Route>   */}
        
                
                
            </Routes> 
        </Suspense>
    </div>
  )
}



export default RouterURL
