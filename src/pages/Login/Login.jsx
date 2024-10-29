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
    <div className="w-full h-[100vh] bg-blue-600 pic-bg flex justify-center items-center">
      <div className="relative w-[700px] h-[400px] backdrop-blur-md rounded-lg flex flex-col items-center">
        <h1 className="text-4xl text-center text-white p-[15px] mb-7">Login</h1>
        <input
          placeholder="Enter your email"
          className="placeholder:text-white px-5 w-[70%] border bg-[#00000000] text-white h-[250px] mb-3"
          value={email}
          onChange={(val) => {
            setEmail(val.target.value);
          }}
        ></input>

        <input
          type="password"
          placeholder="Enter your password"
          className="placeholder:text-white px-5 w-[70%] border bg-[#00000000] text-white h-[250px] mb-3"
          value={password}
          onChange={(val) => {
            setPassword(val.target.value);
          }}
        ></input>

        <div className="relative w-full h-[100vh] ">
          <button
            onClick={handleLogin}
            className="font-medium absolute left-[14%] w-[70%] hover:bg-blue-900 bg-blue-500 text-white h-[40px] bottom-[10px]"
          >
            Login
          </button>
        </div>
        <div class="relative w-full h-[100vh]">
          <GoogleLogin/>
        </div>

        <div className="relative w-full h-[100vh] ">
          <Link to={"/register"}>
            <button className="font-medium absolute bottom-[10px] left-[14%] w-[70%] hover:bg-red-600 bg-red-500 h-[40px]">
              Register
            </button>
          </Link>
          
        </div>
      </div>
    </div>
  );
}
