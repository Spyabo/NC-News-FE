import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";
import { Article, getArticle, patchArticleVotes } from "../api";
import Comments from "../components/FullArticle/Comments";
import Header from "../components/FullArticle/Header";

export default function FullArticle() {
  const { article_ID } = useParams();
  const location = useLocation();
  const [votes, setVotes] = useState(location.state);

  const {
    isLoading,
    error,
    data: article,
  } = useQuery<Article, Error>({
    queryKey: ["Single_Article"],
    queryFn: () => getArticle(article_ID as string),
  });

  const handleUpvote = () => {
    setVotes(parseInt(votes) + 1);
  };

  const handleDownvote = () => {
    setVotes(parseInt(votes) - 1);
  };

  useEffect(() => {
    const handleLeavePage = () => {
      patchArticleVotes(article_ID as string, votes);
    };

    return () => {
      handleLeavePage();
    };
  }, []);

  if (isLoading) return <PacmanLoader color="#36d7b7" />;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="FullArticle">
      <Header
        title={article.title}
        topic={article.topic}
        author={article.author}
        date={article.created_at}
      />
      <img src={article.article_img_url} alt="Cover Image" />
      <p>{article.body}</p>
      <div style={{ display: "flex" }}>
        <p style={{ margin: "10px" }}>Votes: {votes} </p>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          style={{ marginBottom: "10px" }}
        >
          <Button onClick={() => handleUpvote()}>{" + "}</Button>
          <Button onClick={() => handleDownvote()}>{" - "}</Button>
        </ButtonGroup>
      </div>
      <Comments />
    </div>
  );
}
