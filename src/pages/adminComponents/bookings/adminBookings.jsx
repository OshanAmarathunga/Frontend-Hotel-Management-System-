
import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";

export default function AdminBookings() {
 const [bookingList,setBookingList]=useState([]);

 const token=localStorage.getItem("token");
 const config={
  headers:{
    Authorization:`Bearer ${token}`,
  },
 }

 useEffect(()=>{
  loadTable();
 },[]);

 const loadTable=()=>{
  axios.get(import.meta.env.VITE_BACKEND_URL+'/api/booking/getAllBookings').then((rsp)=>{
     setBookingList(rsp.data.rslt);
  }).catch((e)=>{
    alert(e);
  });
 };
 
  return (
    <div className="w-full px-4 py-6">
      <h1 className="text-2xl font-semibold text-white mb-6">Admin Bookings</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full  border bg-gray-100 border-gray-200 shadow-2xl rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-left px-4 py-2 font-medium text-gray-700">Booking ID</th>
              <th className="text-left px-4 py-2 font-medium text-gray-700">Email</th>
              <th className="text-left px-4 py-2 font-medium text-gray-700">Status</th>
              <th className="text-left px-4 py-2 font-medium text-gray-700">Room Id</th>
              <th className="text-left px-4 py-2 font-medium text-gray-700">Start Date</th>
              <th className="text-left px-4 py-2 font-medium text-gray-700">End Date</th>
              <th className="text-left px-4 py-2 font-medium text-gray-700">Action</th>
              
            </tr>
          </thead>
          <tbody>
            {bookingList && bookingList.map((eachbooking)=>(
              <tr key={eachbooking.customerId} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="px-4 py-2">{eachbooking.bookingId}</td>
              <td className="px-4 py-2">{eachbooking.email}</td>
              <td className="px-4 py-2">{eachbooking.status}</td>
              <td className="px-4 py-2">{eachbooking.roomId}</td> 
              <td className='px-4'>{new Date(eachbooking.start).toLocaleDateString("en-US",{
                weekday: "long",
                year: "numeric", 
                month: "long", 
                day: "numeric", 
              })}</td>
              <td className="px-4 py-2">{new Date(eachbooking.end).toLocaleDateString("en-US",{
                weekday: "long",
                year: "numeric", 
                month: "long", 
                day: "numeric",
              })}</td>
              <td className="text-center">
                <button className="hover:size-7" ><FaPen /></button>
              </td>
            </tr>
            ))

            }

          </tbody>
        </table>
      </div>
    </div>
  );
}
