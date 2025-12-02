import { useEffect, useState } from "react";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("history");

      if (!raw) {
        setHistory([]);
        return;
      }

      const parsed = JSON.parse(raw);

      if (Array.isArray(parsed)) {
        setHistory(parsed);
      } else {
        setHistory([]);
      }
    } catch (err) {
      console.error("Error parsing history:", err);
      setHistory([]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Riwayat Pembelian</h1>

      {history.length === 0 ? (
        <p className="text-gray-400">Belum ada transaksi.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {history.map((order) => (
            <div
              key={order.id}
              className="bg-gray-800 p-4 rounded-xl border border-gray-700"
            >
              <p className="font-bold">ORDER #{order.id}</p>
              {order.items?.map((it, idx) => (
                <div key={idx} className="mt-2">
                  <p>Game: {it.game.name}</p>
                  <p>Diamond: {it.diamond}</p>
                  <p>Harga: Rp {Number(it.price).toLocaleString()}</p>
                </div>
              ))}
              <p className="mt-2">Total: Rp {Number(order.total).toLocaleString()}</p>
              <p className="text-xs text-gray-400 mt-1">{order.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
