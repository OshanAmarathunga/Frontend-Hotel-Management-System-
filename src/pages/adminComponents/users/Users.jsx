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
import Swal from "sweetalert2";

export default function Users() {
  const [userList, setUserList] = useState([]);
  const options = ["Admin", "Customer"];
  const emailVerifiedOptions = ["Verified", "Not Verified"];
  const userStatusOptions = ["Active", "Disabled"];
  const [userType, setUserType] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [whatsappNumber, setWhatsappNumber] = useState(null);
  const [mobileNumber, setMobileNumber] = useState(null);
  const [userStatus, setUserStatus] = useState(null);
  const [emailVerified, setEmailVerified] = useState(null);
  const [email, setEmail] = useState(null);
  const [updateButton, setUpdateButton] = useState(false);
  const [password,setPassword]=useState(null);

  useEffect(() => {
    loadUserTable();
  }, []);

  function loadUserTable() {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users")
      .then((rsp) => {
        setUserList(rsp.data.list);
      })
      .catch((e) => {
        alert(e);
      });
  }

  function clearTextFeilds() {
    setFirstName("");
    setLastName("");
    setWhatsappNumber("");
    setMobileNumber("");
    setEmail("");
    setUserStatus("");
    setEmailVerified("");
    setUserType("");
    setPassword("")
  }

  function updateUser(user) {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setWhatsappNumber(user.whatsapp);
    setMobileNumber(user.phone);
    setUserStatus(user.disabled == true ? "Active" : "Disabled");
    setEmailVerified(user.emailVerified == false ? "Not Verified" : "Verified");
    setUserType(user.type);
    setEmail(user.email);
  }

  function updateUserIntoDatabase() {
    const updatedUser = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      type: userType,
      whatsapp: whatsappNumber,
      phone: mobileNumber,
      disabled: userStatus == "Active" ? true : false,
      emailVerified: emailVerified == "Verified" ? true : false,
    };

    axios
      .put(import.meta.env.VITE_BACKEND_URL + "/api/users", updatedUser)
      .then((rsp) => {
        console.log(rsp);
        loadUserTable();
        Swal.fire({
          title: "Updated!",
          text: "Update Successful !",
          icon: "success",
        });
        clearTextFeilds();
        setUpdateButton(false);
      })
      .catch((e) => {
        Swal.fire({
          title: "Fail",
          text: "Update Fail!",
          icon: "unsuccess",
        });
      });
  }

  function deleteUser(user) {
    const email = user.email;

    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "/api/users/" + email)
      .then((rsp) => {
        console.log("rsp", rsp);

        loadUserTable();
        Swal.fire({
          title: "Deleted!",
          text: "Delete Successful !",
          icon: "success",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function saveUser() {
    const saveUser = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      type: userType,
      whatsapp: whatsappNumber,
      phone: mobileNumber,
      disabled: userStatus == "Active" ? true : false,
      emailVerified: emailVerified == "Verified" ? true : false,
      email: email,
      password:password
    };

    console.log(saveUser);

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users", saveUser)
      .then((rsp) => {
        Swal.fire({
          title: "Saved!",
          text: "User Saved Successful!",
          icon: "success",
        });

        loadUserTable();
        clearTextFeilds();
      })
      .catch((e) => {
        console.log(e);

        Swal.fire({
          title: "Fail!",
          text: "User Saved Failed!",
          icon: "fail",
        });
      });
  }

  return (
    <div>
      <h1 className="text-white font-bold pl-10 pt-5 text-[30px] drop-shadow-lg">
        User Management
      </h1>
      <div className="p-5 flex">
        <div className="w-[40%]">
          <div className="mb-2">
            <TextField
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              sx={{ bgcolor: "white", width: "270px" }}
              InputLabelProps={{ shrink: Boolean(firstName) }}
              value={firstName}
              id="filled-basic"
              label="First Name"
              variant="filled"
            />
          </div>
          <div className="mb-2">
            <TextField
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              value={lastName}
              InputLabelProps={{ shrink: Boolean(lastName) }}
              sx={{ bgcolor: "white", width: "270px" }}
              id="filled-basic"
              label="Last Name"
              variant="filled"
            />
          </div>
          <div className="mb-2">
            <TextField
              sx={{ bgcolor: "white", width: "270px" }}
              id="filled-basic"
              label="Whatsapp Number"
              variant="filled"
              onChange={(e) => {
                setWhatsappNumber(e.target.value);
              }}
              value={whatsappNumber}
              InputLabelProps={{ shrink: Boolean(whatsappNumber) }}
            />
          </div>
        </div>
        <div className="w-[40%]">
          <div className="mb-2">
            <TextField
              sx={{ bgcolor: "white", width: "270px" }}
              id="filled-basic"
              label="Mobile Number"
              variant="filled"
              onChange={(e) => {
                setMobileNumber(e.target.value);
              }}
              value={mobileNumber}
              InputLabelProps={{ shrink: Boolean(mobileNumber) }}
            />
          </div>
          <div className="mb-2">
            <Autocomplete
              options={userStatusOptions}
              value={userStatus}
              onChange={(event, newValue) => {
                setUserStatus(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  sx={{ bgcolor: "white", width: "270px" }}
                  {...params}
                  label="User Status"
                  variant="outlined"
                />
              )}
              sx={{ width: 200 }}
            />
          </div>
          <div className="mb-2">
            <Autocomplete
              options={emailVerifiedOptions}
              value={emailVerified}
              onChange={(event, newValue) => setEmailVerified(newValue)}
              renderInput={(params) => (
                <TextField
                  sx={{ bgcolor: "white", width: "270px" }}
                  {...params}
                  label="Email Verified"
                  variant="outlined"
                />
              )}
              sx={{ width: 200 }}
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
                  sx={{ bgcolor: "white" }}
                  {...params}
                  label="User Type"
                  variant="outlined"
                />
              )}
              sx={{ width: 200 }}
            />
          </div>
          {!updateButton && (
            <div className="mb-2">
              <TextField
                sx={{ bgcolor: "white", width: "200px" }}
                id="filled-basic"
                label="Email"
                variant="filled"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                InputLabelProps={{ shrink: Boolean(email) }}
              />
            </div>
          )}
          {!updateButton && (
            <div className="mb-2">
              <TextField
                sx={{ bgcolor: "white", width: "200px" }}
                id="filled-basic"
                label="Password"
                variant="filled"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                InputLabelProps={{ shrink: Boolean(email) }}
              />
            </div>
          )}
          {updateButton && (
            <div>
              <Button
                sx={{ bgcolor: "green", m: "2px" }}
                variant="contained"
                onClick={() => {
                  updateUserIntoDatabase();
                  clearTextFeilds();
                }}
              >
                Update
              </Button>
            </div>
          )}
          {!updateButton && (
            <div>
              <Button
                sx={{ bgcolor: "yellow", m: "2px", color: "black" }}
                variant="contained"
                onClick={() => {
                  saveUser();
                }}
              >
                ADD user
              </Button>
            </div>
          )}
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
                  Email
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
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">
                    {row.disabled ? "Active" : "Disabled"}
                  </TableCell>
                  <TableCell align="center">
                    {row.emailVerified ? "Verified" : "Not Verified"}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      sx={{ bgcolor: "green", m: "2px" }}
                      variant="contained"
                      onClick={() => {
                        updateUser(row);
                        setUpdateButton(true);
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => {
                        deleteUser(row);
                      }}
                      sx={{ bgcolor: "Red" }}
                      variant="contained"
                    >
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
