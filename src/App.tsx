import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Nav-bar/Header";
import Articles from "./pages/Articles";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
