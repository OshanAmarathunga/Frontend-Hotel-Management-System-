import React from "react";
import "./login.css";

export default function Login() {
  return (
    <div className="w-full h-[100vh] bg-blue-600 pic-bg flex justify-center items-center">
      <div className="relative w-[700px] h-[400px] backdrop-blur-md rounded-lg flex flex-col items-center">
        <h1 className="text-4xl text-center text-white p-[15px] ">Login</h1>
        <input
          placeholder="Enter your email"
          className="placeholder:text-white px-5 w-[70%] border bg-[#00000000] text-white h-[40px] mb-3"
        ></input>
        <input type="password"
          placeholder="Enter your email"
          className="placeholder:text-white px-5 w-[70%] border bg-[#00000000] text-white h-[40px] mb-3"
        ></input>
        <button className='absolute w-[70%] hover:bg-blue-900 bg-blue-500 text-white h-[40px] bottom-[40px]'>Login</button>
      </div>
    </div>
  );
}
