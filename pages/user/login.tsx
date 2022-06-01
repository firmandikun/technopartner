import React, { useEffect, useState } from 'react'
import Image from "next/image";
import axios from 'axios'
import Cookies from "js-cookie";
import { useRouter } from 'next/router';


const login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();


    useEffect(() => {
        if(localStorage.getItem('token')) {
            router.push('/user/login');
        }
    }, []);



    const loginHandler = async (e) => {
        e.preventDefault();
        var bodyFormData = new FormData();
        bodyFormData.append("grant_type", "password");
        bodyFormData.append("client_secret", "0a40f69db4e5fd2f4ac65a090f31b823");
        bodyFormData.append("client_id", "e78869f77986684a");
        bodyFormData.append("username", username);
        bodyFormData.append("password", password);

        //send data to server
        await axios.post("https://soal.staging.id/oauth/token" , bodyFormData )
        .then((response) => {

            //set token on localStorage
            // localStorage.setItem('token', response.data.access_token);
            const  token  = response.data.access_token;
            // const tokenBase64 = window.btoa(token);
            Cookies.set('token', token , { expires: 7 })
            console.log(response.data.access_token);
 
            router.push("/");
        })
        .catch((error) => {

            console.log(error);
            
        })
    };


  return (
   <div className="container">
        <div className="row d-flex justify-content-center align-items-center" >
        <div className="col-lg-5 col-sm-12 p-5">
           {/* <Image 
            src="/assets/logo technopartner.png" 
          
            alt=""
            objectFit="cover"
            layout="fill"
            >    
            </Image> */}
          <img src="/assets/logo technopartner.png" className="img-fluid" alt="..." />
        </div>
        <div className="col-12 mt-2 px-5">
        <form onSubmit={loginHandler} >
                <div className="mb-3">
                   <span className="d-flex justify-content-center mb-2">username</span>
                    <input type="email"
                            className="form-control border-0 shadow"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            
                            />
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                     <span className="d-flex justify-content-center mb-2">Password</span>
                    <input 
                      type="password"
                      className="form-control border-0 shadow"
                      id="exampleInputPassword1"
                      value={password}
                      onChange={(e) =>  setPassword(e.target.value)}
                    />
                </div>
                <div className="text-center">
                  <button  className="btn btn-link border-0 shadow btn-lg "  style={{ color: "black " }} >Submit</button>
                </div>
            </form>
        </div>
    </div>
   </div>
  )
}

export default login
