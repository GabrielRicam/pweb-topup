import { useEffect, useState } from "react";
import { loadDiamondItems, saveDiamondItems } from "../utils/storage";

export default function Admin() {
  const [games, setGames] = useState({});
  const [selectedGame, setSelectedGame] = useState(null);

  // form game
  const [gameName, setGameName] = useState("");
  const [gameImage, setGameImage] = useState("");

  // form diamond
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    setGames(loadDiamondItems());
  }, []);

  // SAVE to localStorage
  const updateStorage = (data) => {
    saveDiamondItems(data);
    setGames(data);
  };

  // ADD GAME
  const addGame = () => {
    if (!gameName || !gameImage) return alert("Nama & gambar wajib!");

    const data = { ...games };

    if (data[gameName]) return alert("Game sudah ada!");

    data[gameName] = {
      image: gameImage,
      items: [],
    };

    updateStorage(data);
    setGameName("");
    setGameImage("");
  };

  // DELETE GAME
  const deleteGame = (name) => {
    if (!confirm("Hapus game ini?")) return;

    const data = { ...games };
    delete data[name];
    updateStorage(data);

    if (selectedGame === name) setSelectedGame(null);
  };

  // ADD DIAMOND ITEM
  const addDiamond = () => {
    if (!selectedGame) return alert("Pilih game dulu!");
    if (!amount || !price) return alert("Isi amount & price!");

    const data = { ...games };
    data[selectedGame].items.push({
      amount: parseInt(amount),
      price: parseInt(price),
    });

    updateStorage(data);
    setAmount("");
    setPrice("");
  };

  // DELETE DIAMOND ITEM
  const deleteDiamond = (index) => {
    const data = { ...games };
    data[selectedGame].items.splice(index, 1);
    updateStorage(data);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* LEFT PANEL: ADD GAME */}
        <div className="bg-gray-800 p-5 rounded-xl">
          <h2 className="text-xl font-bold mb-3">Tambah Game</h2>

          <input
            className="w-full p-2 mb-3 bg-gray-700 rounded"
            placeholder="Nama Game"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
          />

          <input
            className="w-full p-2 mb-3 bg-gray-700 rounded"
            placeholder="URL Gambar Game"
            value={gameImage}
            onChange={(e) => setGameImage(e.target.value)}
          />

          <button
            onClick={addGame}
            className="w-full bg-blue-600 py-2 rounded mt-1"
          >
            Tambah Game
          </button>

          <h2 className="text-xl font-bold mt-6 mb-3">Daftar Game</h2>

          {Object.keys(games).length === 0 && (
            <p className="text-gray-400">Belum ada game.</p>
          )}

          {Object.keys(games).map((g) => (
            <div
              key={g}
              className={`p-3 rounded-xl flex justify-between items-center mb-2 cursor-pointer 
                ${selectedGame === g ? "bg-gray-700" : "bg-gray-900"}`}
              onClick={() => setSelectedGame(g)}
            >
              <span>{g}</span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteGame(g);
                }}
                className="bg-red-600 px-3 py-1 rounded"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>

        {/* RIGHT PANEL: DIAMOND MANAGEMENT */}
        <div className="bg-gray-800 p-5 rounded-xl">
          <h2 className="text-xl font-bold mb-3">Kelola Diamond</h2>

          {!selectedGame && (
            <p className="text-gray-400">Pilih game untuk mulai menambah diamond.</p>
          )}

          {selectedGame && (
            <>
              <h3 className="text-lg font-semibold mb-3 text-blue-400">
                {selectedGame}
              </h3>

              {/* ADD DIAMOND */}
              <div className="flex gap-3 mb-4">
                <input
                  className="w-full p-2 bg-gray-700 rounded"
                  type="number"
                  placeholder="Jumlah Diamond"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />

                <input
                  className="w-full p-2 bg-gray-700 rounded"
                  type="number"
                  placeholder="Harga"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />

                <button
                  onClick={addDiamond}
                  className="bg-green-600 px-4 rounded"
                >
                  +
                </button>
              </div>

              {/* DIAMOND LIST */}
              {games[selectedGame]?.items?.length === 0 ? (
                <p className="text-gray-400">Belum ada diamond.</p>
              ) : (
                games[selectedGame]?.items?.map((item, i) => (
                  <div
                    key={i}
                    className="bg-gray-900 p-3 mb-2 rounded-xl flex justify-between"
                  >
                    <span>{item.amount} Diamond — Rp {item.price.toLocaleString()}</span>

                    <button
                      onClick={() => deleteDiamond(i)}
                      className="bg-red-600 px-3 rounded"
                    >
                      Hapus
                    </button>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
