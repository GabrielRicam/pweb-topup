import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import GamePage from "./pages/GamePage";
import PaymentPage from "./pages/PaymentPage";
import ConfirmPage from "./pages/ConfirmPage";
import Admin from "./pages/Admin";
import SuccessPage from "./pages/SuccessPage";
import HistoryPage from "./pages/HistoryPage";

export default function App() {

  // ============================
  // DATA GAME + DIAMOND OPTIONS
  // ============================
  const [game, setGame] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/api/games.php")
      .then(res => res.json())
      .then(data => {
        setGame(data);
        console.log("Game data:", data); // untuk debugging
      })
      .catch(err => console.error("Fetch error:", err));
  }, []);

  // ============ ORDER / CART STATE ============
  const [keranjang, setKeranjang] = useState([]);
  const [orders, setOrders] = useState(() =>
    JSON.parse(localStorage.getItem("orders") || "[]")
  );

  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedDiamond, setSelectedDiamond] = useState(null);
  const [idPlayer, setIdPlayer] = useState("");
  const [metode, setMetode] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Shop game={game} />} />

        <Route path="/game" element={<GamePage games={game}/>} />

        <Route path="/payment" element={<PaymentPage />} />

        <Route path="/confirm" element={<ConfirmPage />} />

        <Route path="/cart" element={<Cart />} />

        {/* ADMIN MENERIMA DATA GAME + SETTER */}
        <Route
          path="/admin"
          element={<Admin />}
        />

        <Route path="/success" element={<SuccessPage />} />
        <Route path="/history" element={<HistoryPage orders={orders} />} />
      </Routes>
    </BrowserRouter>
  );
}
