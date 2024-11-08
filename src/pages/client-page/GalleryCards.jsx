import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function GalleryCards(props) {
  return (
    <div className="mx-4" key={props.key}>
      <Card sx={{ maxWidth: 345, maxHeight: 550 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={props.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              maxHeight: 100, // Set max height
              overflowY: "auto", // Enable vertical scrollbar,
              color: "text.secondary"
            }}
            variant="body2"
            
          >
            {props.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
