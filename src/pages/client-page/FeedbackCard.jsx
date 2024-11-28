import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function FeedbackCard(prop) {
  return (
    <div className="mx-4">
      <Card key={prop.key} sx={{ minWidth: 275, maxHeight:150, overflowY: "auto" }}>
        <CardContent>
          <Stack spacing={1}>
            <Rating
              name="half-rating-read"
              defaultValue={4}
              precision={prop.rating}
              readOnly
            />
          </Stack>

          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            "{prop.feedback}"
          </Typography>
          <Typography variant="body2">{prop.name}</Typography>
          <Typography variant="body2">{new Date(prop.date).toLocaleDateString("en-US", {
                          weekday: "long", 
                          month: "long", 
                          day: "numeric",
                          year: "numeric", 
                        })}</Typography>
        </CardContent>
      </Card>
    </div>
  );
}
