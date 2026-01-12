import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Shop from "./pages/Shop";
import GamePage from "./pages/GamePage";
import SuccessPage from "./pages/SuccessPage";
import HistoryPage from "./pages/HistoryPage";

export default function App() {

  // ============================
  // DATA GAME + DIAMOND OPTIONS
  // ============================
  const [game, setGame] = useState([]);
  useEffect(() => {
    fetch("/api/games.php")
      .then(res => res.json())
      .then(data => {
        setGame(data);
      })
      .catch(err => console.error("Fetch error:", err));
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Shop game={game} />} />

        <Route path="/game" element={<GamePage games={game}/>} />

        <Route path="/success" element={<SuccessPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}
