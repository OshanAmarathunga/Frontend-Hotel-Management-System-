import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineNotificationsActive } from "react-icons/md";
import GoogleLogin from "./GoogleLogin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  function handleLogin() {
    const loginData = {
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:5000/api/users/login", loginData)
      .then((result) => {
        Swal.fire({
          title: "Login!",
          text: "Login Successful !",
          icon: "success",
        });
        localStorage.setItem("token", result.data.token);

        if (result.data.user.type == "Admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      })
      .catch((e) => {
        Swal.fire(
          "Invalid login credentials, If you have not registered yet, please register!"
        );
      });
  }

  return (
    <div className="w-full h-[100vh] bg-blue-600 pic-bg flex rounded-3xl items-center pl-10">
      <div className="relative w-[700px] h-[400px] backdrop-blur-md rounded-3xl  flex flex-col items-center">
        <h1 className="text-4xl text-center font-bold text-balck p-[15px] mb-7">Login</h1>
        <input
          placeholder="Enter your email"
          className="placeholder:text-black px-5 w-[70%] border bg-[#00000000] text-black h-[250px] mb-3"
          value={email}
          onChange={(val) => {
            setEmail(val.target.value);
          }}
        ></input>

        <input
          type="password"
          placeholder="Enter your password"
          className="placeholder:text-black rounded-sm px-5 w-[70%] border bg-[#00000000] text-black h-[250px] mb-3"
          value={password}
          onChange={(val) => {
            setPassword(val.target.value);
          }}
        ></input>

        <div className="relative w-full h-[100vh] ">
          <button
            onClick={handleLogin}
            className="font-medium absolute rounded-md left-[14%] w-[70%] hover:bg-gray-400 bg-white text-black h-[40px] bottom-[10px]"
          >
            Login
          </button>
        </div>
        <div className="relative w-full h-[100vh]">
          <GoogleLogin/>
        </div>

        <div className="relative w-full h-[100vh] ">
          <Link to={"/register"}>
            <button className="font-medium absolute bottom-[25px] left-[14%] w-[70%] hover:bg-gray-400 shadow-lg rounded-lg  bg-white h-[40px]">
              Register
            </button>
          </Link>
          
        </div>
      </div>
    </div>
  );
}
