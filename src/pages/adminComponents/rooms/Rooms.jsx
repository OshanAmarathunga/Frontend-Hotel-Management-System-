import React, { useState } from "react";
import CardComponent from "./Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import uploadMedia from "../../../utils/mediaUpload";
import Swal from "sweetalert2";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

export default function Rooms() {
  const [roomId, setRoomId] = useState(null);
  const [roomName, setRoomName] = useState(null);
  const [description, setDescription] = useState(null);
  const [maxGuests, setMaxGuests] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [availability, setAvailability] = useState(null);
  const [category, setCategory] = useState(null);
  const [note, setNote] = useState(null);
  const availableOptions = ["Available", "Not Available"];
  const categoryOptions = ["Luxury", "Delux", "Family", "Couple", "Honeymoon"];
  const [file, setFile] = useState(null);
  const [urlList, setUrlList] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  async function handleFileUpload() {
    if (imageList.length == 0) {
      alert("Please select images to upload!");
      return;
    }
    const uploadUrls = [];
    try {
      for (const file of imageList) {
        const url = await uploadMedia(file);
        if (url) {
          uploadUrls.push(url);
        }
      }
      setUrlList(uploadUrls);

      setOpen(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "All images uploaded!",
        showConfirmButton: false,
        timer: 3500,
      });

      setImageList([]);
    } catch (e) {
      console.error("File upload error:", error);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "An error occurred while uploading images.",
      });
    }
  }

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImageList((prevList) => [...prevList, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImageList((prevList) => prevList.filter((_, i) => i !== index));
  };
  const token = localStorage.getItem("token");
  const config={
    headers:{
      Authorization :`Bearer ${token}`
    },
  }

  function saveNewRoom() {
    const data = {
      roomId: roomId,
      name: roomName,
      specialDescription: description,
      maximumGuests: maxGuests,
      photo: imageList,
      available: availability=="Available"?true:false,
      category: category,
      notes: note,
    };
    console.log("data : ", data);
    

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/room", data,config)
      .then((rsp) => {
        console.log("rsp ", rsp);
      })
      .catch((e) => {
        alert("save Error");
      });
  }

  return (
    <div>
      <div>
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>

      <h1 className="text-blue-800 font-bold pl-10 pt-5 text-[30px] drop-shadow-lg">
        Room Management
      </h1>
      <div className="pl-10 pt-4 flex space-x-20">
        <div className="space-y-3 ">
          <div>
            <TextField
              onChange={(e) => {
                setRoomId(e.target.value);
              }}
              value={roomId}
              id="outlined-basic"
              label="Room ID"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              onChange={(e) => {
                setRoomName(e.target.value);
              }}
              value={roomName}
              id="outlined-basic"
              label="Room Name"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
              id="outlined-basic"
              label="Description"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              onChange={(e) => {
                setMaxGuests(e.target.value);
              }}
              value={maxGuests}
              id="outlined-basic"
              label="Maximum Guests"
              variant="outlined"
            />
          </div>
        </div>

        <div className="space-y-3 w-[30%]">
          <div>
            <div className="flex">
              <label className=" px-2 py-2 h-9  bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition duration-300 ease-in-out shadow-md">
                SELECT IMAGE
                <input
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleImageChange}
                />
              </label>
              <div className="ml-1">
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  onClick={() => {
                    handleFileUpload();
                    handleOpen();
                  }}
                >
                  Upload
                </Button>
              </div>
            </div>

            {imageList.length > 0 && (
              <div className="m-4 flex gap-1">
                {imageList.map((file, index) => (
                  <div key={index} className="relative bg-black">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`selected Preview ${index}`}
                      className="w-20 h-20 object-cover rounded-md "
                    />
                    <button
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200"
                      onClick={() => handleRemoveImage(index)}
                      aria-label="Delete Image"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <Autocomplete
              onChange={(e,newValue) => {
                setAvailability(newValue)
              }}
              value={availability}
              disablePortal
              options={availableOptions}
              renderInput={(params) => (
                <TextField {...params} label="Availability" />
              )}
            />
          </div>
          <div>
            <Autocomplete
              disablePortal
              options={categoryOptions}
              value={category}
              onChange={(e,newValue)=>{setCategory(newValue)}}
              renderInput={(params) => (
                <TextField {...params} label="Category" />
              )}
            />
          </div>
          <div className="w-[100%]">
            <TextField value={note} onChange={(e)=>{setNote(e.target.value)}} id="outlined-basic" label="Notes" variant="outlined" />
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <Button onClick={saveNewRoom} variant="contained" color="success">
              Add Room
            </Button>
          </div>
          <div>
            <Button variant="contained" color="warning">
              Update Room
            </Button>
          </div>
        </div>
      </div>

      <div className="p-10">
        <CardComponent
          roomID={"R001"}
          roomName={"Family Pack"}
          description={"description"}
          maxGuests={"4"}
          category={"luxury"}
          availability={"yes"}
          image={"image"}
        />
      </div>
    </div>
  );
}
