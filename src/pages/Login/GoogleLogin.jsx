import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../config/firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

export default function GoogleLogin() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  function googleLogin() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(async (result) => {
        const token = result.user.accessToken;
        console.log("token");

        axios
          .post(
            import.meta.env.VITE_BACKEND_URL + "/api/users/googleLogin/" + token
          )
          .then((rsp) => {
            handleClose();

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
            handleClose();

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
      <Backdrop
        sx={(theme) => ({borderRadius:"20px", color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <button
        onClick={()=>{googleLogin()
          handleOpen()}
        }
        className="absolute left-[14%] w-[70%] flex items-center justify-center hover:bg-gray-400 bg-white text-white h-[40px] bottom-[25px] rounded-md shadow-md transition duration-300 ease-in-out"
      >
        <img src="icon.png" alt="Google Icon" className="w-5 h-5 mr-2" />
        <span className="text-gray-700 font-medium">Sign in with Google</span>
      </button>
    </div>
  );
}
