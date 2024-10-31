import React, { useState } from "react";
import CardComponent from "./Card";
import TextField from "@mui/material/TextField";

export default function Rooms() {
  return (
    <div>
      <h1 className="text-blue-800 font-bold pl-10 pt-5 text-[30px] drop-shadow-lg">
        Room Management
      </h1>
      <div className="pl-10 pt-4 flex space-x-20">
        <div className="space-y-3">
          <div>
            <TextField
              id="outlined-basic"
              label="Room ID"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Room Name"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Maximum Guests"
              variant="outlined"
            />
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <TextField
              id="outlined-basic"
              label="Image"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Availability"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Category"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Notes"
              variant="outlined"
            />
          </div>
        </div>
        <div className="space-y-3">
          <h1>button</h1>
        </div>
      </div>

      <div className="p-10">
        <CardComponent />
      </div>
    </div>
  );
}
