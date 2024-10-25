import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Users() {
  const [userList,setUserList]=useState([]);

  useEffect(()=>{
    loadUserTable();
  },[])

  function loadUserTable(){
    axios.get("http://localhost:5000/api/users").then((rsp)=>{
      console.log(rsp);
      
      setUserList(rsp.data.list);
    }).catch((e)=>{
      alert(e);
    });
  }
  return (
    <div>
      <h1 className='text-white font-bold pl-10 pt-5 text-[30px] drop-shadow-lg'>Users List</h1>
      <div className='p-10'>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow >
            <TableCell sx={{fontWeight:'bold', fontSize:'15px'}}>First Name</TableCell>
            <TableCell sx={{fontWeight:'bold', fontSize:'15px'}} align="right">Last Name</TableCell>
            {/* <TableCell align="right">Image</TableCell> */}
            <TableCell sx={{fontWeight:'bold', fontSize:'15px'}} align="right">Type</TableCell>
            <TableCell sx={{fontWeight:'bold', fontSize:'15px'}} align="right">Whatsapp Number</TableCell>
            <TableCell sx={{fontWeight:'bold', fontSize:'15px'}} align="right">Mobile Number</TableCell>
            <TableCell sx={{fontWeight:'bold', fontSize:'15px'}} align="right">Status</TableCell>
            <TableCell sx={{fontWeight:'bold', fontSize:'15px'}} align="right">Email Verified Status</TableCell>
            <TableCell sx={{fontWeight:'bold', fontSize:'15px'}} align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.firstName}</TableCell>
              <TableCell align="right">{row.lastName}</TableCell>
              {/* <TableCell align="right">{row.img}</TableCell> */}
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.whatsapp}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.disabled?'Active':'Disabled'}</TableCell>
              <TableCell align="right">{row.emailVerified?'Verified':'Not Verified'}</TableCell>
              <TableCell align="right">
                <Button sx={{bgcolor:"green", mx:"5px"}} variant="contained">Update</Button>
                <Button sx={{bgcolor:"Red"}} variant="contained">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
  )
}
