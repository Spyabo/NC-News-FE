import { useQuery } from "@tanstack/react-query";
import PacmanLoader from "react-spinners/PacmanLoader";
import { Article, getArticles } from "../api";
import ArticleListItem from "../components/ArticleListItem";

export default function Articles() {
  const {
    isLoading,
    error,
    data: articles,
  } = useQuery<Article[], Error>({
    queryKey: ["articlesData"],
    queryFn: getArticles,
  });

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PacmanLoader color="#36d7b7" />
      </div>
    );
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      {articles.map((article) => (
        <ArticleListItem key={article.article_id} article={article} />
      ))}
    </div>
  );
}
