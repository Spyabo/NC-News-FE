import { Box, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { postComment } from "../../api";
import ProfilePic from "../ProfilePic";

export default function PostComment() {
  const [comment, setComment] = useState("");
  const { article_ID } = useParams();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postComment({
      article_id: article_ID as string,
      username: "weegembump",
      body: comment,
      created_at: new Date().toISOString(),
    });
    setComment("");
    console.log("Form submitted!");
  };

  return (
    <Box
      component="form"
      sx={{ display: "flex", alignItems: "flex-end" }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        id="outlined-controlled"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <ProfilePic username={"weegembump"} />
            </InputAdornment>
          ),
        }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setComment(event.target.value);
        }}
        value={comment}
        color="primary"
        fullWidth
        sx={{ input: { color: "white", opacity: "80%" } }}
      />
    </Box>
  );
}
