import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Swal from "sweetalert2";

export default function Registration() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [wtNumber, setWtNumber] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorWhNumber, setErrorWhNumber] = useState(false);
  const [errorFirstName, setErrorFirstName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorMobileNo, setErrorMobileNo] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  function handleSubmit() {
    if (wtNumber === "") {
      setErrorWhNumber(true);
      return;
    }
    if (firstName === "") {
      setErrorFirstName(true);
      return;
    }
    if (lastName === "") {
      setErrorLastName(true);
      return;
    }
    if (mobileNo === "") {
      setErrorMobileNo(true);
      return;
    }
    if (email === "") {
      setErrorEmail(true);
      return;
    }
    if (password === "") {
      setErrorPassword(true);
      return;
    }

    const data = {
      firstName: firstName,
      lastName: lastName,
      whatsapp: wtNumber,
      phone: mobileNo,
      email: email,
      password: password
    };

    axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/saveuser", data)
      .then((res) => {
        console.log(res);

        setFirstName("");
        setLastName("");
        setWtNumber("");
        setMobileNo("");
        setEmail("");
        setPassword("");

        Swal.fire({
          title: "Registration!",
          text: "Registration Successful!",
          icon: "success",
        });
      })
      .catch((e) => {
        console.log(e.response.data);

        Swal.fire(
          `Registration fail!`
        );
      });
  }

  return (
    <div className="relative w-full min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(b.jpg)' }}>
      <div className="relative w-full md:w-[80%] lg:w-[60%] mx-auto p-6 md:p-12 lg:p-16 flex flex-col backdrop-blur-lg rounded-lg shadow-lg">
        <h1 className="text-3xl md:text-4xl lg:text-5xl drop-shadow-lg mb-3 text-blue-50 font-bold">Register with us!</h1>
        <div>
          <div className="mb-3">
            <TextField
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                firstName !== "" ? setErrorFirstName(false) : setErrorFirstName(true);
              }}
              sx={{ bgcolor: "white" }}
              className="w-full md:w-[400px] lg:w-[500px]"
              id="filled-basic"
              label="First name"
              variant="filled"
              error={errorFirstName}
              helperText={errorFirstName ? 'This field cannot be empty' : ' '}
            />
          </div>
          <div className="mb-3">
            <TextField
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                lastName !== "" ? setErrorLastName(false) : setErrorLastName(true);
              }}
              sx={{ bgcolor: "white" }}
              className="w-full md:w-[400px] lg:w-[500px]"
              id="filled-basic"
              label="Last name"
              variant="filled"
              error={errorLastName}
              helperText={errorLastName ? "This field cannot be empty" : ""}
            />
          </div>
          <div className="mb-3">
            <TextField
              value={wtNumber}
              onChange={(e) => {
                setWtNumber(e.target.value);
                wtNumber !== "" ? setErrorWhNumber(false) : setErrorWhNumber(true);
              }}
              error={errorWhNumber}
              helperText={errorWhNumber ? 'This field cannot be empty' : ''}
              sx={{ bgcolor: "white" }}
              className="w-full md:w-[400px] lg:w-[500px]"
              id="filled-basic"
              label="Whatsapp Number"
              variant="filled"
            />
          </div>
          <div className="mb-3">
            <TextField
              value={mobileNo}
              onChange={(e) => {
                setMobileNo(e.target.value);
                mobileNo !== "" ? setErrorMobileNo(false) : setErrorMobileNo(true);
              }}
              error={errorMobileNo}
              helperText={errorMobileNo ? "This field cannot be empty" : ""}
              sx={{ bgcolor: "white" }}
              className="w-full md:w-[400px] lg:w-[500px]"
              id="filled-basic"
              label="Mobile no"
              variant="filled"
            />
          </div>
          <div className="mb-3">
            <TextField
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                email !== "" ? setErrorEmail(false) : setErrorEmail(true);
              }}
              error={errorEmail}
              helperText={errorEmail ? "This field cannot be empty" : ""}
              sx={{ bgcolor: "white" }}
              className="w-full md:w-[400px] lg:w-[500px]"
              id="filled-basic"
              label="Email"
              variant="filled"
            />
          </div>
          <div className="mb-3">
            <TextField
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                password !== "" ? setErrorPassword(false) : setErrorPassword(true);
              }}
              error={errorPassword}
              helperText={errorPassword ? "This field cannot be empty" : ""}
              sx={{ bgcolor: "white" }}
              className="w-full md:w-[400px] lg:w-[500px]"
              id="filled-basic"
              label="Password"
              variant="filled"
            />
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className="bg-blue-400 w-full md:w-[400px] lg:w-[500px] mt-5 h-9 font-bold hover:bg-blue-800"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
