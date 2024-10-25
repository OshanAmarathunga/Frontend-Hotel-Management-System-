import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function Users() {
  const [userList, setUserList] = useState([]);
  const options = ["Admin", "Customer"];
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    loadUserTable();
  }, []);

  function loadUserTable() {
    axios
      .get("http://localhost:5000/api/users")
      .then((rsp) => {
        console.log(rsp);

        setUserList(rsp.data.list);
      })
      .catch((e) => {
        alert(e);
      });
  }
  return (
    <div>
      <h1 className="text-white font-bold pl-10 pt-5 text-[30px] drop-shadow-lg">
        Users Management
      </h1>
      <div className="p-5 flex">
        <div className="w-[40%]">
          <div className="mb-2">
            <TextField id="filled-basic" label="First Name" variant="filled" />
          </div>
          <div className="mb-2">
            <TextField id="filled-basic" label="Last Name" variant="filled" />
          </div>
          <div className="mb-2">
            <TextField
              id="filled-basic"
              label="Whatsapp Number"
              variant="filled"
            />
          </div>
        </div>
        <div className="w-[40%]">
          <div className="mb-2">
            <TextField
              id="filled-basic"
              label="Mobile Number"
              variant="filled"
            />
          </div>
          <div className="mb-2">
            <TextField id="filled-basic" label="User Status" variant="filled" />
          </div>
          <div className="mb-2">
            <TextField
              id="filled-basic"
              label="Email Verified"
              variant="filled"
            />
          </div>
        </div>
        <div className="w-[20%]">
          <div className="mb-2">
            <Autocomplete
              options={options}
              value={userType}
              onChange={(event, newValue) => setUserType(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="User Type"
                  variant="outlined"
                />
              )}
              sx={{ width: 200 }}
            />
          </div>
        </div>
      </div>
      <div className="p-5">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
                  First Name
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "15px" }}
                  align="center"
                >
                  Last Name
                </TableCell>
                {/* <TableCell align="right">Image</TableCell> */}
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "15px" }}
                  align="center"
                >
                  Type
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "15px" }}
                  align="center"
                >
                  Whatsapp Number
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "15px" }}
                  align="center"
                >
                  Mobile Number
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "15px" }}
                  align="center"
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "15px" }}
                  align="center"
                >
                  Email Verified Status
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "15px" }}
                  align="center"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {row.firstName}
                  </TableCell>
                  <TableCell align="center">{row.lastName}</TableCell>
                  {/* <TableCell align="right">{row.img}</TableCell> */}
                  <TableCell align="center">{row.type}</TableCell>
                  <TableCell align="center">{row.whatsapp}</TableCell>
                  <TableCell align="center">{row.phone}</TableCell>
                  <TableCell align="center">
                    {row.disabled ? "Active" : "Disabled"}
                  </TableCell>
                  <TableCell align="center">
                    {row.emailVerified ? "Verified" : "Not Verified"}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      sx={{ bgcolor: "green", mx: "5px" }}
                      variant="contained"
                    >
                      Update
                    </Button>
                    <Button sx={{ bgcolor: "Red" }} variant="contained">
                      Delete
                    </Button>
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
