import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Registration() {
  return (
    <div className=" relative w-ful h-[700px]">
      <img src="b.jpg" className="w-full h-full absolute object-cover" />
      <div className="relative w-[50%] h-full p-8 flex-col backdrop-blur-xl rounded-lg">
        <h1 className="text-[40px] drop-shadow-lg mb-3 text-blue-50 font-bold">Register with us !</h1>
        <div>
          <div className="mb-3">
          <TextField sx={{bgcolor:"white"}} className="w-[500px]" id="filled-basic" label="First name" variant="filled" />
          </div>
          <div className="mb-3">
          <TextField sx={{bgcolor:"white"}} className="w-[500px]" id="filled-basic" label="Last name" variant="filled" />
          </div>
          <div className="mb-3">
          <TextField sx={{bgcolor:"white"}} className="w-[500px]" id="filled-basic" label="Whatsapp Number" variant="filled" />
          </div>
          <div className="mb-3">
          <TextField sx={{bgcolor:"white"}} className="w-[500px]" id="filled-basic" label="Mobile no" variant="filled" />
          </div>
          <div className="mb-3">
          <TextField sx={{bgcolor:"white"}} className="w-[500px]" id="filled-basic" label="Email" variant="filled" />
          </div>
          <div className="mb-3">
          <TextField sx={{bgcolor:"white"}} className="w-[500px]" id="filled-basic" label="Password" variant="filled" />
          </div>
          <div>
            <button className="bg-blue-400 w-[500px] mt-5 h-9 font-bold hover:bg-blue-800">Submit</button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
