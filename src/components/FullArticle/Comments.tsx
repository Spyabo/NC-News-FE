import { useQuery } from "@tanstack/react-query";
import dateformat from "dateformat";
import { useParams } from "react-router-dom";
import { Comment, getArticleComments } from "../../api";

export default function Comments() {
  const { article_ID } = useParams();
  const {
    isLoading,
    error,
    data: comments,
  } = useQuery<Comment[], Error>({
    queryKey: ["Article_Comments"],
    queryFn: () => getArticleComments(article_ID as string),
  });

  if (error) return <div>{error.message}</div>;

  const handleUpvote = (commentId: string) => {
    // TODO: Implement upvote logic
  };

  const handleDownvote = (commentId: string) => {
    // TODO: Implement downvote logic
  };

  return (
    <div>
      {comments?.map((comment) => (
        <div
          key={comment.comment_id}
          style={{
            marginBottom: "10px",
            borderRadius: "10px",
            border: "1px solid grey",
            padding: "10px",
            position: "relative",
          }}
        >
          <div style={{ fontWeight: "bold" }}>Author: {comment.author}</div>
          <div>{comment.body}</div>
          <div style={{ position: "absolute", bottom: "5px", right: "5px" }}>
            <div style={{ float: "right" }}>
              <button
                style={{
                  margin: "5px",
                  fontSize: "12px",
                  padding: "3px",
                  width: "20px",
                }}
                onClick={() => handleUpvote(comment.comment_id)}
              >
                {" + "}
              </button>
              <button
                style={{
                  fontSize: "12px",
                  padding: "3px",
                  width: "20px",
                }}
                onClick={() => handleDownvote(comment.comment_id)}
              >
                {"  -  "}
              </button>
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "grey",
                marginTop: "5px",
                float: "right",
              }}
            >
              Votes: {comment.votes}
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              fontSize: "12px",
              color: "grey",
            }}
          >
            {dateformat(comment.created_at, "default")}
          </div>
        </div>
      ))}
    </div>
  );
}
