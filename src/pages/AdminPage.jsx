import { useEffect, useState } from "react";
import { loadDiamondItems, saveDiamondItems } from "../utils/storage";

// Fallback default data
const DEFAULT_DATA = {
  "Mobile Legends": {
    image: "https://i.ibb.co/RTCbGyM/mlbb.jpg",
    items: [
      { id: 1, amount: 86, price: 20000, stock: 999, discount: 0 },
      { id: 2, amount: 172, price: 38000, stock: 999, discount: 0 },
    ],
  },
  "Free Fire": {
    image: "https://i.ibb.co/jbJ5KSj/ff.jpg",
    items: [{ id: 1, amount: 100, price: 18000, stock: 999, discount: 0 }],
  },
  "PUBG Mobile": {
    image: "https://i.ibb.co/zVnnF0n/pubgm.jpg",
    items: [{ id: 1, amount: 60, price: 25000, stock: 999, discount: 0 }],
  },
};

export default function AdminPage() {
  const [auth, setAuth] = useState(() => !!localStorage.getItem("adminAuth"));
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const [data, setData] = useState({});
  const [selectedGame, setSelectedGame] = useState("");

  useEffect(() => {
    let loaded = loadDiamondItems();
    if (!loaded || Object.keys(loaded).length === 0) {
      saveDiamondItems(DEFAULT_DATA);
      loaded = DEFAULT_DATA;
    }
    setData(loaded);

    const keys = Object.keys(loaded);
    if (keys.length) setSelectedGame(keys[0]);
  }, []);

  // LOGIN — super simple
  const login = (e) => {
    e.preventDefault();
    if (user === "admin" && pass === "admin") {
      localStorage.setItem("adminAuth", "1");
      setAuth(true);
    } else {
      alert("Username/password salah (default: admin/admin)");
    }
  };

  const logout = () => {
    localStorage.removeItem("adminAuth");
    setAuth(false);
  };

  const save = (d) => {
    setData(d);
    saveDiamondItems(d);
  };

  // GAME CRUD
  const addGame = () => {
    const name = prompt("Nama game:");
    if (!name) return;

    if (data[name]) return alert("Game sudah ada.");

    const img = prompt("URL gambar (optional):") || "";

    const next = { ...data, [name]: { image: img, items: [] } };
    save(next);
    setSelectedGame(name);
  };

  const editGame = () => {
    const newName = prompt("Nama baru:", selectedGame);
    if (!newName) return;

    const newImg = prompt("URL gambar:", data[selectedGame].image);

    const copy = { ...data };
    const val = copy[selectedGame];
    delete copy[selectedGame];

    copy[newName] = { ...val, image: newImg };
    save(copy);
    setSelectedGame(newName);
  };

  const deleteGame = () => {
    if (!confirm("Hapus game ini?")) return;

    const copy = { ...data };
    delete copy[selectedGame];
    save(copy);

    const keys = Object.keys(copy);
    setSelectedGame(keys[0] || "");
  };

  // ITEM CRUD
  const addItem = () => {
    const amount = prompt("Jumlah Diamond:");
    if (!amount) return;

    const price = prompt("Harga:");
    if (!price) return;

    const stock = prompt("Stok:", "999") || "999";
    const discount = prompt("Diskon %:", "0") || "0";

    const newItem = {
      id: Date.now(),
      amount: Number(amount),
      price: Number(price),
      stock: Number(stock),
      discount: Number(discount),
    };

    const copy = { ...data };
    copy[selectedGame].items.push(newItem);
    save(copy);
  };

  const editItem = (item) => {
    const amount = prompt("Jumlah diamond:", item.amount);
    const price = prompt("Harga:", item.price);
    const stock = prompt("Stok:", item.stock);
    const discount = prompt("Diskon %:", item.discount);

    if (!amount || !price || stock === null || discount === null) return;

    const copy = { ...data };
    copy[selectedGame].items = copy[selectedGame].items.map((i) =>
      i.id === item.id
        ? {
            ...i,
            amount: Number(amount),
            price: Number(price),
            stock: Number(stock),
            discount: Number(discount),
          }
        : i
    );

    save(copy);
  };

  const deleteItem = (item) => {
    if (!confirm("Hapus item ini?")) return;

    const copy = { ...data };
    copy[selectedGame].items = copy[selectedGame].items.filter(
      (i) => i.id !== item.id
    );

    save(copy);
  };

  // Upload gambar lokal
  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      const copy = { ...data };
      copy[selectedGame].image = base64;
      save(copy);
    };
    reader.readAsDataURL(f);
  };

  // LOGIN SCREEN
  if (!auth) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6 flex justify-center items-center">
        <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
          <form onSubmit={login} className="space-y-3">
            <input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full p-3 bg-gray-900 rounded"
              placeholder="username"
            />
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full p-3 bg-gray-900 rounded"
              placeholder="password"
            />
            <button className="w-full bg-blue-600 py-3 rounded-xl font-semibold">
              Login
            </button>
            <p className="text-xs text-gray-400 text-center">
              Username/password: admin / admin
            </p>
          </form>
        </div>
      </div>
    );
  }

  // ADMIN PANEL
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between mb-5">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <button className="bg-red-600 px-3 py-2 rounded" onClick={logout}>
          Logout
        </button>
      </div>

      {/* GAME SELECT */}
      <div className="flex gap-3 mb-4">
        <select
          value={selectedGame}
          onChange={(e) => setSelectedGame(e.target.value)}
          className="bg-gray-800 p-3 rounded"
        >
          {Object.keys(data).map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>

        <button className="bg-green-600 px-3 py-2 rounded" onClick={addGame}>
          Tambah Game
        </button>
        <button className="bg-yellow-500 px-3 py-2 rounded" onClick={editGame}>
          Edit Game
        </button>
        <button className="bg-red-600 px-3 py-2 rounded" onClick={deleteGame}>
          Hapus Game
        </button>
      </div>

      {/* UPLOAD GAMBAR */}
      <div className="mb-5">
        <label className="text-sm text-gray-300">Ganti Gambar</label>
        <input type="file" onChange={handleFile} className="mt-1 text-sm" />
      </div>

      {/* ITEM LIST */}
      <div className="space-y-4">
        {data[selectedGame]?.items?.map((item) => (
          <div
            key={item.id}
            className="bg-gray-800 p-4 rounded-xl border border-gray-700 flex justify-between"
          >
            <div>
              <p className="font-bold">{item.amount} Diamond</p>
              <p className="text-blue-400">
                Rp {item.price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-400">
                Stok {item.stock} — Diskon {item.discount}%
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => editItem(item)}
                className="bg-yellow-500 px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteItem(item)}
                className="bg-red-600 px-3 py-1 rounded"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ADD ITEM BUTTON */}
      <div className="fixed left-1/2 bottom-8 -translate-x-1/2 w-11/12 max-w-lg">
        <button
          onClick={addItem}
          className="bg-blue-600 w-full py-3 rounded-xl font-semibold"
        >
          Tambah Diamond
        </button>
      </div>
    </div>
  );
}
