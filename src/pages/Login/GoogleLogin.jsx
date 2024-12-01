import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../config/firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function GoogleLogin() {
  const navigate = useNavigate();

  function googleLogin() {
    
    
    const provider = new GoogleAuthProvider();
    
    
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const token =result.user.accessToken;
        console.log("token");
        

        axios
          .post(
            import.meta.env.VITE_BACKEND_URL + "/api/users/googleLogin/" + token
          )
          .then((rsp) => {
            console.log("rsp");
            
            Swal.fire({
              title: "Login!",
              text: "Login Successful !",
              icon: "success",
            });
            localStorage.setItem("token", rsp.data.token);

            if (rsp.data.user.type == "Admin") {
              navigate("/admin");
            } else {
              navigate("/home");
            }
          })
          .catch((e) => {
            console.log("error");
            
            Swal.fire(
              "User not Found !, If you have not registered yet, please register!"
            );
          });
      })
      .catch((e) => {
        console.log("error : ", e);
      });
  }

  function googleLoginAuthentication() {}

  return (
    <div>
      <button
        onClick={googleLogin}
        className="absolute left-[14%] w-[70%] flex items-center justify-center hover:bg-gray-400 bg-white text-white h-[40px] bottom-[35px] rounded-md shadow-md transition duration-300 ease-in-out"
      >
        <img src="icon.png" alt="Google Icon" className="w-5 h-5 mr-2" />
        <span className="text-gray-700 font-medium">Sign in with Google</span>
      </button>
    </div>
  );
}
