import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function GamePage({ games }) {
  const location = useLocation();
  const navigate = useNavigate();
  const game = location.state?.game;

  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [userId, setUserId] = useState("");
  const [payment, setPayment] = useState("");

  // LOAD ITEMS
  useEffect(() => {
    if (!game || !games) return;
    const selectedGame = games.find((g) => g.name === game.name);
    if (selectedGame) {
      setItems(selectedGame.diamonds || []);
    }
  }, [game, games]);

  const checkout = () => {
    if (!selected) return alert("Pilih nominal diamond!");
    if (!userId) return alert("Masukkan ID Player!");
    if (!payment) return alert("Pilih metode pembayaran!");

    // simpan history
    const order = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: [
        {
          game,
          diamond: selected.amount,
          stock: selected.stock,
          discount: selected.discount,
        },
      ],
      userId,
      payment,
    };

    // SAVE HISTORY
    const history = JSON.parse(localStorage.getItem("history")) || [];
    history.push(order);
    localStorage.setItem("history", JSON.stringify(history));

    // Note: Perubahan stok tidak disimpan karena data dimuat dari JSON static
    // Untuk fitur ini, butuh implementasi backend/API

    // pindah ke successpage
    navigate("/success", { state: { order } });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="w-full h-48 my-24 relative overflow-hidden rounded-xl">
        <img
          src={game?.image}
          alt={game?.name}
          className="w-full h-full object-cover brightness-50"
        />

        <div className="absolute inset-0  backdrop-blur-sm"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-2xl font-bold text-white drop-shadow-lg">
            {game?.name}
          </h1>
        </div>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelected(item)}
            className={`
                p-4 rounded-xl transform transition-all duration-200 border 
                ${selected?.id === item.id
                  ? "bg-blue-600 border-blue-400 shadow-lg shadow-blue-500/50"
                  : "bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-gray-500 hover:shadow-lg"
                }
            `}
          >
            <p className="font-bold">{item.amount} {game?.currency}</p>
            <p>Rp {item.price.toLocaleString()}</p>
          </button>

        ))}
      </div>

      <div className="mb-6">
        <label htmlFor="playerId" className="block text-xl font-bold mb-2">
          Masukan ID Player
        </label>
        <input
          id="playerId"
          type="text"
          className="w-full p-3 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="ID Player"
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <p className="text-xl font-bold mb-3">Pilih Metode Pembayaran</p>
        <div className="relative">
          <select
            className="w-full p-3 rounded bg-gray-800 appearance-none"
            onChange={(e) => setPayment(e.target.value)}>
            <option value="" disabled>Pilih Metode Pembayaran</option>
            <option value="OVO">OVO</option>
            <option value="Dana">Dana</option>
            <option value="Gopay">Gopay</option>
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="w-5 h-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 9.707a.946.95 .946.95 0 0 1 .707.708l4.292 4.293a.962.96 .962.96 0 0 1 .027.084l-5.5 5.5a.94.09 .94.09 0 0 0-.027.084l-4.293 4.293a.962.96 .962.96 0 0 0 .027.084l5.5-5.5a.946.95 .946.95 0 0 1-.707.708z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
      </div>

      <button
        onClick={checkout}
        className="w-full bg-blue-600 py-3 rounded-xl font-semibold">
        Beli Sekarang
      </button>
    </div>
  );
}
