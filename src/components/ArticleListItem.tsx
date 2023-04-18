import { Article } from "../api";

export default function ArticleListItem({ article }: { article: Article }) {
  const backgroundStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  return (
    <div
      style={{
        position: "relative",
        border: "2px solid white",
        padding: "10px",
      }}
    >
      <img
        src={article.article_img_url}
        alt="Background Image"
        style={backgroundStyle as any}
      />
      <h3>{article.title}</h3>
      <p>{`Topic: ${article.topic}`}</p>
      <p>{`Author: ${article.author}`}</p>
    </div>
  );
}
