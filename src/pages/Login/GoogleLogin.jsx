
import { GoogleAuthProvider,signInWithPopup } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../../config/firebase';

export default function GoogleLogin() {
    const [user,setUser]=useState(null);

    function googleLogin(){
        const provider=new GoogleAuthProvider();
        signInWithPopup(auth,provider).then(async(result)=>{
            setUser(result);
           console.log("user : ",user.user);
           
            
        })
    }
  return (
    <div>
        <button onClick={googleLogin}  class="absolute left-[14%] w-[70%] flex items-center justify-center hover:bg-gray-400 bg-white text-white h-[40px] bottom-[35px] rounded-md shadow-md transition duration-300 ease-in-out">
            <img src="icon.png" alt="Google Icon" class="w-5 h-5 mr-2"  />
            <span class="text-gray-700 font-medium">Sign in with Google</span>
          </button>
      
    </div>
  )
}
