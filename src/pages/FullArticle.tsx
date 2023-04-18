import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";
import { Article, getArticle } from "../api";
import Header from "../components/FullArticle/Header";

export default function FullArticle() {
  const { article_ID } = useParams();
  const {
    isLoading,
    error,
    data: article,
  } = useQuery<Article, Error>({
    queryKey: ["Single_Article"],
    queryFn: () => getArticle(article_ID as string),
  });

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
    </div>
  );
}
