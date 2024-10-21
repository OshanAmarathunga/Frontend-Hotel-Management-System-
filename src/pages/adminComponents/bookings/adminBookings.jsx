
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function AdminBookings() {
 const [bookingList,setBookingList]=useState([]);

 const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGE2OTgzOGNhMjQ5ZjJkM2E5ZWMwMCIsImVtYWlsIjoib3NoYW45NEBnbWFpbCIsImZpcnN0TmFtZSI6InVzaGFuIiwibGFzdE5hbWUiOiJ1aml0aCIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTcyOTUzNTQ4MCwiZXhwIjoxNzI5NTM5MDgwfQ.rkwDNWU4BqFQMZebZ0y-vWgwlycQlzsWIP8FumXG5JI'
 const config={
  headers:{
    Authorization:`Bearer ${token}`,
  },
 }

 useEffect(()=>{
  loadTable();
 },[]);

 const loadTable=()=>{
  axios.get("http://localhost:5000/api/booking/getBookings",config).then((rsp)=>{
    console.log("response",rsp.data.AllBookings);
    
    setBookingList(rsp.data.AllBookings);
  }).catch((e)=>{
    alert(e);
  });
 };

  return (
    <div className="w-full px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">Admin Bookings</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-left px-4 py-2 font-medium text-gray-700">Booking ID</th>
              <th className="text-left px-4 py-2 font-medium text-gray-700">Email</th>
              <th className="text-left px-4 py-2 font-medium text-gray-700">Start Date</th>
              <th className="text-left px-4 py-2 font-medium text-gray-700">End Date</th>
              <th className="text-left px-4 py-2 font-medium text-gray-700">Status</th>
              <th className="text-left px-4 py-2 font-medium text-gray-700">Reason</th>
            </tr>
          </thead>
          <tbody>
            {bookingList && bookingList.map((eachbooking)=>(
              <tr key={eachbooking.customerId} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="px-4 py-2">{eachbooking.roomId}</td>
              <td className="px-4 py-2">{eachbooking.email}</td>
              <td className="px-4 py-2">{eachbooking.status}</td>
              <td className="px-4 py-2">{eachbooking.reason}</td>
              <td className='px-4'>{eachbooking.start}</td>
              <td className="px-4 py-2">{eachbooking.end}</td>
            </tr>
            ))

            }



            
              
            
          </tbody>
        </table>
      </div>
    </div>
  );
}
