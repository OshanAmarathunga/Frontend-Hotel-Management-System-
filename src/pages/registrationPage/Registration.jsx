import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Swal from "sweetalert2";

export default function Registration() {
 const [firstName,setFirstName]=useState("");
 const [lastName,setLastName]=useState("");
 const [wtNumber,setWtNumber]=useState("");
 const [mobileNo,setMobileNo]=useState("");
 const [email,setEmail]=useState("");
 const [password,setPassword]=useState("");
 const [error, setError] = useState(false);

 function handleSubmit(){

    if(wtNumber==""){
        setError(true);
    }else{
        setError(false);
    }
    const data={
        firstName:firstName,
        lastName:lastName,
        whatsapp:wtNumber,
        phone:mobileNo,
        email:email,
        password:password
     }
    
     axios.post("http://localhost:5000/api/users",data)
     .then((res)=>{
        console.log(res);
        
        setFirstName("");
        setLastName("");
        setWtNumber("");
        setMobileNo("");
        setEmail("");
        setPassword("");
        
        Swal.fire({
            title: "Registration!",
            text: "Registration Successful !",
            icon: "success",
          })
     })
     .catch((e)=>{
        Swal.fire(
            `Registration fail ! ${e.response.data.error}`
          );
     })
 }

  return ( 
    <div className=" relative w-ful h-[700px]">
      <img src="b.jpg" className="w-full h-full absolute object-cover" />
      <div className="relative w-[45%] h-full p-[70px] flex-col backdrop-blur-xl rounded-lg">
        <h1 className="text-[40px] drop-shadow-lg mb-3 text-blue-50 font-bold">Register with us !</h1>
        <div>
          <div className="mb-3">
          <TextField value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} sx={{bgcolor:"white"}} className="w-[500px]" id="filled-basic" label="First name" variant="filled" />
          </div>
          <div className="mb-3">
          <TextField value={lastName} onChange={(e)=>{setLastName(e.target.value)}} sx={{bgcolor:"white"}} className="w-[500px]" id="filled-basic" label="Last name" variant="filled" />
          </div>
          <div className="mb-3">
          <TextField value={wtNumber} onChange={(e)=>{setWtNumber(e.target.value); wtNumber!=""?setError(false):setError(true);}} error={error} helperText={error ? 'This field cannot be empty' : ''} sx={{bgcolor:"white"}} className="w-[500px]" id="filled-basic" label="Whatsapp Number" variant="filled" />
          </div>
          <div className="mb-3">
          <TextField value={mobileNo} onChange={(e)=>{setMobileNo(e.target.value)}} sx={{bgcolor:"white"}} className="w-[500px]" id="filled-basic" label="Mobile no" variant="filled" />
          </div>
          <div className="mb-3">
          <TextField value={email} onChange={(e)=>{setEmail(e.target.value)}} sx={{bgcolor:"white"}} className="w-[500px]" id="filled-basic" label="Email" variant="filled" />
          </div>
          <div className="mb-3">
          <TextField value={password} onChange={(e)=>{setPassword(e.target.value)}} sx={{bgcolor:"white"}} className="w-[500px]" id="filled-basic" label="Password" variant="filled" />
          </div>
          <div>
            <button onClick={handleSubmit} className="bg-blue-400 w-[500px] mt-5 h-9 font-bold hover:bg-blue-800">Submit</button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
