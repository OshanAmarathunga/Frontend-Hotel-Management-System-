import React from 'react'


function UserData(props) {
  
    
  return (
    <div className='absolute right-0 flex items-center'>
        <img className='rounded-full w-[80px] h-[80px]'  src={props.image} />
      <h1 className='text-white ml-[5px] mr-[10px] text-xl cursor-pointer'>{props.name}</h1>
    </div>
  )
}

export default UserData;
