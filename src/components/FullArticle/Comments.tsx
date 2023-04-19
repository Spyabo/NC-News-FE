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
          <div
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              fontSize: "12px",
              color: "grey",
            }}
          >
            {dateformat(comment.created_at, "longDate")}
          </div>
        </div>
      ))}
    </div>
  );
}
