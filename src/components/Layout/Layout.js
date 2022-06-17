import React,{useEffect} from 'react'
// import { login_Service } from './Services/Grammar_Service';
import { Service } from '../Login/Services/Services';
function Layout(props) {
    useEffect(() => {

        Service.loginSuccess({}).then((response)=>{
         console.log("response:",response)
        })
        // const getUser = () => {
        //     fetch("http://localhost:4000/user/login_success", {
        //       method: "GET",
        //       credentials: "include",
        //       headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json",
        //         "Access-Control-Allow-Credentials": true,
        //       },
        //     })
        //       .then((response) => {
        //         if (response.status === 200) {
        //             console.log("thành côn")
        //         }
        //         throw new Error("authentication has been failed!");
        //       })
        //       .then((resObject) => {
        //         console.log("resObject.user:",resObject.user)
        //         // setUser(resObject.user);
        //       })
        //       .catch((err) => {
        //         console.log(err);
        //       });
        //   };
        //   getUser();
        
        // const getUser = () => {
        //   fetch("http://localhost:5000/auth/login/success", {
        //     method: "GET",
        //     credentials: "include",
        //     headers: {
        //       Accept: "application/json",
        //       "Content-Type": "application/json",
        //       "Access-Control-Allow-Credentials": true,
        //     },
        //   })
        //     .then((response) => {
        //       if (response.status === 200) return response.json();
        //       throw new Error("authentication has been failed!");
        //     })
        //     .then((resObject) => {
        //       console.log("resObject.user:",resObject.user)
        //       setUser(resObject.user);
        //     })
        //     .catch((err) => {
        //       console.log(err);
        //     });
        // };
        // getUser();
      }, []);
  return (
    <div>Layout</div>
  )
}

export default Layout
