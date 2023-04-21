import { Box, InputAdornment, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Comment, postComment } from "../../api";
import ProfilePic from "../ProfilePic";

export default function PostComment() {
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const { article_ID } = useParams();
  const queryClient = useQueryClient();
  let errMessage = "You are offline";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!navigator.onLine) {
      setIsOffline(true);
      return;
    }
    if (!comment) return;
    try {
      const newComment: Partial<Comment> = {
        article_id: article_ID as string,
        username: "weegembump",
        body: comment,
        created_at: new Date().toISOString(),
      };
      await postComment(newComment);
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
    } catch (error) {
      setIsOffline(true);
      errMessage = "Server is offline";
    }
  };

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

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
      )}
      {isOffline && (
        <div
          style={{
            backgroundColor: "#f44336",
            color: "white",
            padding: "3px 5px",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          Error: {errMessage}
        </div>
      )}
    </Box>
  );
}
