import React, { useState } from "react";
import { Link } from "react-router-dom";

function UserData(props) {

  const [savedToken,setSavedToken]=useState(localStorage.getItem("token"));

  return (
    <div className="absolute right-0 flex items-center">
      <Link to={"/login"}>
        <button onClick={(e)=>{setSavedToken(localStorage.removeItem("token"))}} className="text-sm mr-3 px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300">
          LogOut
        </button>
      </Link>

      <div></div>
      <img className="rounded-full w-[80px] h-[80px]" src={props.image} />
      <h1 className="text-white ml-[5px] mr-[10px] text-xl cursor-pointer">
        {props.name}
      </h1>
    </div>
  );
}

export default UserData;
