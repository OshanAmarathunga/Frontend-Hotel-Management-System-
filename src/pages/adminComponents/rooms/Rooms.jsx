import React, { useState } from 'react'
import uploadMedia from '../../../utils/mediaUpload'

export default function Rooms() {
  const [file,setFile]=useState(null);
  const handleFileUpload= async()=>{
    if(file){
      const url =await uploadMedia(file);
      if(url){
        console.log("File uplaod success ", url);
        
      }else{
        console.error("Fail to uplaod file");
      }
    }else{
      console.warn("No file selected ")
    }
  };
  return (
    <div>
      <input  onChange={(e)=>{setFile(e.target.files[0])}} type="file"/>
      <button  onClick={handleFileUpload}>submit</button>
    </div>
    
  )
}
