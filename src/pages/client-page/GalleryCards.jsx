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
      <Card sx={{ maxWidth: {xs:300,sm:345}, maxHeight: { xs: 300, sm: 550} }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={props.image}
          
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{color:"white", background:"red", textAlign:"center"}}>
            {props.name}
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              maxHeight: 100, // Set max height
              overflowY: "auto", // Enable vertical scrollbar,
              color: "text.secondary",
              fontSize: { xs: "0.875rem", sm: "1rem" }
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
