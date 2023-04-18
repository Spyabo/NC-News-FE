import { Article } from "../api";

export default function ArticleListItem({ article }: { article: Article }) {
  return (
    <div style={{ border: "2px solid white", padding: "10px" }}>
      <h3>{article.title}</h3>
      <p>{`Topic: ${article.topic}`}</p>
      <p>{`Author: ${article.author}`}</p>
    </div>
  );
}
