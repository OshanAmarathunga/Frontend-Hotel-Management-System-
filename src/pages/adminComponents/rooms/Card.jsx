import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function CardComponent(prop) {
  return (
    <div>
      <Card key={prop.roomId} sx={{ maxWidth: 1200 }}>
        <div className="flex">
          {prop.image &&
            prop.image.map((image,index) => (
              <div key={index}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={image}
                  sx={{ width: "300px", height: "200px", objectFit: "cover", padding:"10px", borderRadius:"20px"  }}
                />
              </div>
            ))}

          <div>
            <CardContent>
              <Typography gutterBottom variant="h7" component="div">
                {prop.roomID}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {prop.roomName}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Number of guests : {prop.maxGuests}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Category : {prop.category}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Status : {prop.availability}
              </Typography>

              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {prop.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" size="small" color="success">
                Update
              </Button>
              <Button variant="contained" size="small" color="warning">
                Delete
              </Button>
            </CardActions>
          </div>
        </div>
      </Card>
    </div>
  );
}
