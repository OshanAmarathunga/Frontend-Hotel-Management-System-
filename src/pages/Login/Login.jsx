import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import Swal from 'sweetalert2'

export default function Login() {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [token,setToken]=useState("");

    function handleLogin(){
      const loginData={
        email:email,
        password:password
      }
      
      axios.post("http://localhost:5000/api/users/login",loginData)
      .then((result)=>{
        Swal.fire({
          title: "Login!",
          text: "Login Successful !",
          icon: "success"
        });
        setToken(result.data.token);
        
        
        
      }).catch((e)=>{
        Swal.fire("Invalid login credentials !");
      });
      
    }

    
  return (
    <div className="w-full h-[100vh] bg-blue-600 pic-bg flex justify-center items-center">
      <div className="relative w-[700px] h-[400px] backdrop-blur-md rounded-lg flex flex-col items-center">
        <h1 className="text-4xl text-center text-white p-[15px] mb-7">Login</h1>
        <input
          placeholder="Enter your email"
          className="placeholder:text-white px-5 w-[70%] border bg-[#00000000] text-white h-[40px] mb-3"
        value={email} onChange={(val)=>{setEmail(val.target.value)}}></input>

        <input type="password"
          placeholder="Enter your password"
          className="placeholder:text-white px-5 w-[70%] border bg-[#00000000] text-white h-[40px] mb-3"
        value={password} onChange={(val)=>{setPassword(val.target.value)}}></input>
        
        <button onClick={handleLogin}  className='absolute w-[70%] hover:bg-blue-900 bg-blue-500 text-white h-[40px] bottom-[40px]'>Login</button>
      </div>
    </div>
  );
}