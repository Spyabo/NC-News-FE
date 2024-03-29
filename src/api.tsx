import axios from "axios";

const api = axios.create({
  baseURL: "https://fake-news-plu0.onrender.com/api",
});

export type Article = {
  title: string;
  topic: string;
  author: string;
  body: string;
  created_at: string;
  votes: number;
  article_img_url: string;
  article_id: number;
  comment_count: string;
};

export async function getArticles() {
  const {
    data: { articles },
  } = await api.get<{ articles: Article[] }>("/articles");
  return articles;
}

export async function getArticle(articleId: string) {
  const {
    data: { article },
  } = await api.get<{ article: Article }>(`/articles/${articleId}`);
  return article;
}

export async function patchArticleVotes(articleId: string, votes: number) {
  const {
    data: { article },
  } = await api.patch<{ article: Article }>(`/articles/${articleId}`, {
    inc_votes: votes,
  });
  return article;
}

export type Comment = {
  comment_id: number;
  created_at: string;
  body: string;
  votes: number;
  author?: User["name"];
  username?: User["name"];
  article_id: string;
};

export async function getArticleComments(articleId: string) {
  const {
    data: { comments },
  } = await api.get<{ comments: Comment[] }>(`/articles/${articleId}/comments`);
  return comments;
}

export async function postComment(requestComment: Partial<Comment>) {
  const {
    data: { comment },
  } = await api.post<{ comment: Comment }>(
    `/articles/${requestComment.article_id}/comments`,
    requestComment
  );
  return comment;
}

export type User = {
  username: string;
  name: string;
  avatar_url?: string;
};

export async function getUser(username: string) {
  const {
    data: { user },
  } = await api.get<{ user: User }>(`/users/${username}`);
  return user;
}
