import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Swal from "sweetalert2";

export default function Registration() {
 const [firstName,setFirstName]=useState('');
 const [lastName,setLastName]=useState('');
 const [wtNumber,setWtNumber]=useState('');
 const [mobileNo,setMobileNo]=useState('');
 const [email,setEmail]=useState('');
 const [password,setPassword]=useState('');
 const [errorWhNumber, setErrorWhNumber] = useState(false);
 const [errorFirstName,setErrorFirstName]=useState(false);
 const [errorLastName,setErrorLastName]=useState(false);
 const [errorMobileNo,setErrorMobileNo]=useState(false);
 const [errorEmail,setErrorEmail]=useState(false);
 const [errorPassword,setErrorPassword]=useState(false);

 function handleSubmit(){

    if((wtNumber=="")){
        setErrorWhNumber(true);
       return;
    }
    if(firstName==""){
      setErrorFirstName(true);
      return;
    }
    if(lastName==""){
      setErrorLastName(true);
      return;
    }
    if(mobileNo==""){
      setErrorMobileNo(true);
      return;
    }
    if(email==""){
      setErrorEmail(true);
      return;
    }
    if(password==""){
      setErrorPassword(true);
      return;
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
      console.log(e.response.data);
      
        Swal.fire(
            `Registration fail !`
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
          <TextField value={firstName} onChange={(e)=>{setFirstName(e.target.value); firstName!=""?setErrorFirstName(false):setErrorFirstName(true)} } sx={{bgcolor:"white"}} className="w-[500px]" id="filled-basic" label="First name" variant="filled" error={errorFirstName} helperText={errorFirstName?'This field cannot be empty':'  '}/>
          </div>
          <div className="mb-3">
          <TextField value={lastName} onChange={(e)=>{setLastName(e.target.value); lastName!=""?setErrorLastName(false):setErrorLastName(true)}} sx={{bgcolor:"white"}} className="w-[500px]" id="filled-basic" label="Last name" variant="filled" error={errorLastName} helperText={errorLastName?"This field cannot be empty":""} />
          </div>
          <div className="mb-3">
          <TextField value={wtNumber} onChange={(e)=>{setWtNumber(e.target.value); wtNumber!=""? setErrorWhNumber(false): setErrorWhNumber(true);}} error={errorWhNumber} helperText={errorWhNumber ? 'This field cannot be empty' : ''} sx={{bgcolor:"white"}} className="w-[500px]" id="filled-basic" label="Whatsapp Number" variant="filled" />
          </div>
          <div className="mb-3">
          <TextField value={mobileNo} error={errorMobileNo} helperText={errorMobileNo?"This field cannot be empty":""} onChange={(e)=>{setMobileNo(e.target.value); mobileNo!=""?setErrorMobileNo(false):setErrorMobileNo(true)}} sx={{bgcolor:"white"}} className="w-[500px]" id="filled-basic" label="Mobile no" variant="filled" />
          </div>
          <div className="mb-3">
          <TextField value={email} error={errorEmail} helperText={errorEmail?"This field cannot be empty":""} onChange={(e)=>{setEmail(e.target.value); email!=""?setErrorEmail(false):setErrorEmail(true)}} sx={{bgcolor:"white"}} className="w-[500px]" id="filled-basic" label="Email" variant="filled" />
          </div>
          <div className="mb-3">
          <TextField value={password} error={errorPassword} helperText={errorPassword?"This field cannot be empty":""} onChange={(e)=>{setPassword(e.target.value); password!=""?setErrorPassword(false):setErrorPassword(true)}} sx={{bgcolor:"white"}} className="w-[500px]" id="filled-basic" label="Password" variant="filled" />
          </div>
          <div>
            <button onClick={handleSubmit} className="bg-blue-400 w-[500px] mt-5 h-9 font-bold hover:bg-blue-800">Submit</button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
