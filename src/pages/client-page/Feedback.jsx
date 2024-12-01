import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import TextField from "@mui/material/TextField";
import "@fontsource/roboto"; // Defaults to 400 weight
import "@fontsource/roboto/700.css";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};
function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function Feedback() {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  const [feddback,setFeedback]=useState("");
  const [name,setName]=useState("");

  function handleSubmit(){
    const data={
        rate:value,
        feedback:feddback,
        name:name
    }

    axios.post(import.meta.env.VITE_BACKEND_URL+"/api/feedback",data).then((rsp)=>{
        toast.success('Successfully saved your Feedback !');
        setFeedback("");
        setName("");
        
    }).catch((e)=>{
        console.log(e);
        
    })
    
  }

  return (
    <div className="border border-b-gray-300 p-6 shadow-lg rounded-md md:w-[75%]">
        <Toaster />
      <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-10 tracking-wide font-roboto">
        Tell your valuble feedback with us !
      </h2>
      <div className="flex flex-col justify-center items-center gap-4">
        <div>
          <Box sx={{ width: 200, display: "flex", alignItems: "center" }}>
            <Rating
              name="hover-feedback"
              value={value}
              precision={0.5}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            {value !== null && (
              <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
          </Box>
        </div>
        <div className="w-full max-w-lg">
          <TextField
            id="feedback"
            label="Tell us your feedback!"
            multiline
            maxRows={2}
            variant="filled"
            className="w-full"
            value={feddback}
            onChange={(e) => {setFeedback(e.target.value)}}
          />
        </div>
        {/* Name Input */}
        <div className="w-full max-w-lg">
          <TextField
            id="name"
            label="Your Name"
            multiline
            maxRows={4}
            variant="filled"
            className="w-full"
            value={name}
            onChange={(e) => {setName(e.target.value)}}
          />
        </div>
        {/* Submit Button */}
        <div className="w-full max-w-lg">
          <button
            type="submit"
            className="w-full bg-yellow-300 text-black py-2 px-4 rounded shadow-md hover:bg-yellow-400"
            onClick={(e)=>handleSubmit()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
