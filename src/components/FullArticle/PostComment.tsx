import { Box, InputAdornment, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Comment, postComment } from "../../api";
import ProfilePic from "../ProfilePic";

export default function PostComment() {
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { article_ID } = useParams();
  const queryClient = useQueryClient();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!comment) return;
    const newComment: Partial<Comment> = {
      article_id: article_ID as string,
      username: "weegembump",
      body: comment,
      created_at: new Date().toISOString(),
    };
    postComment(newComment);
    queryClient.setQueryData<Comment[] | undefined>(
      ["Article_Comments"],
      (data) => {
        if (data) {
          const newComment: Comment = {
            article_id: article_ID as string,
            author: "weegembump",
            body: comment,
            created_at: new Date().toISOString(),
            comment_id: data.length + 1,
            votes: 0,
          };
          return [newComment, ...data];
        }
      }
    );
    setComment("");
    setIsSubmitted(true);
  };

  return (
    <Box
      component="form"
      sx={{ display: "flex", alignItems: "flex-end", marginBottom: "10px" }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        id="filled-controlled"
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
        fullWidth
        sx={{
          input: { color: "white", opacity: "80%" },
          color: "white",
        }}
        variant="outlined"
        focused={true}
      />
      {isSubmitted && (
        <div
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "3px 5px",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          Comment posted!
        </div>
      )}{" "}
    </Box>
  );
}
