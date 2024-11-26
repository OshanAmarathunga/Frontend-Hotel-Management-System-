import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

export default function Feedback() {
  const [allFeedbackList, setAllFeedbackList] = useState([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    loadAllFeedbacks();
  }, []);

  function loadAllFeedbacks() {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/feedback/getAll")
      .then((rsp) => {
        setAllFeedbackList(rsp.data.allFeedBacks);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function handleApproveOrPending(row) {
    axios.put(import.meta.env.VITE_BACKEND_URL+"/api/feedback/"+row._id).then((rsp)=>{
      loadAllFeedbacks();
    }).catch((e)=>{
      console.log(e);
      
    })

    
    
  }

  function deleteFeedback(row){

    toast((t) => (
      <span>
        Are You Sure? 
        <button className="bg-black ml-3 px-2 py-1 rounded-md text-white" onClick={() => {
          toast.dismiss(t.id);
          axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/feedback/"+row._id).then((rsp)=>{
            loadAllFeedbacks();
            
            
          }).catch((e)=>{
            console.log(e);
            
          })
          
          }}>
          Ok
        </button>
        <button className="bg-black ml-1 px-2 py-1 rounded-md text-white" onClick={() => {
          toast.dismiss(t.id);
          
          }}>
          Cancel
        </button>
      </span>
    ));
  }

  const label = { inputProps: { "aria-label": "Size switch demo" } };

  return (
    <div >
     
      <Toaster position="top-center" reverseOrder={true} />
      <div>
        <h1 className="p-6 font-bold text-blue-500 text-[35px]">Feedbacks</h1>
      </div>
      <div className="px-10">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow sx={{ background: "#5641be" }}>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Feedback</TableCell>
                <TableCell align="center">Rate</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allFeedbackList &&
                allFeedbackList.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.feedback}</TableCell>
                    <TableCell align="center">{row.rate}</TableCell>
                    <TableCell align="center">{row.status}</TableCell>
                    <TableCell align="center">
                      {new Date(row.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell align="right">
                      {row.status == "pending" ? (
                        <button
                          onClick={() => {
                            handleApproveOrPending(row);
                          }}
                          className="bg-purple-500 text-white rounded-md px-2 py-1 shadow-lg hover:bg-purple-700"
                        >
                          Approve
                        </button>
                      ) : (
                        <button onClick={()=>{
                          handleApproveOrPending(row);
                        }} className="bg-pink-500 text-white rounded-md px-2 py-1 shadow-lg hover:bg-pink-700">
                          Pending
                        </button>
                      )}
                      <button onClick={()=>{deleteFeedback(row)}} className="bg-red-500 ml-2 text-white rounded-md px-2 py-1 shadow-lg hover:bg-red-700">
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
