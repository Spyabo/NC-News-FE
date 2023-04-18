import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Nav-bar/Header";
import Articles from "./pages/Articles";
import FullArticle from "./pages/FullArticle";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/articles/:article_ID" element={<FullArticle />} />
      </Routes>
    </div>
  );
}

export default App;
