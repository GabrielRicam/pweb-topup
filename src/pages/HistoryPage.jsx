import { useEffect, useState } from "react";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/history.php")
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Riwayat Pembelian</h1>

        <p className="flex items-center">Belum ada transaksi.</p>
      ) : (
        <div className="flex flex-col-reverse gap-4">
            <div
              key={order.id}
              className="bg-gray-800 p-4 rounded-xl border border-gray-700 relative"
            >
              {/* STATUS DI KANAN */}
              <span
                className={`
                  absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold
                  ${
                    order.status === "pending"
                      ? "bg-yellow-500 text-black"
                      : order.status === "completed"
                      ? "bg-green-500 text-black"
                      : order.status === "canceled"
                      ? "bg-red-500 text-black"
                      : "bg-gray-500"
                  }
                `}
              >
                {order.status}
              </span>

              <p className="font-bold">ORDER #{order.id}</p>

              {order.items?.map((it, idx) => (
                <div key={idx} className="mt-2">
                  <p>
                    <strong>Game:</strong> {it.game}
                  </p>
                  <p>
                    <strong>Diamond:</strong> {it.amount}
                  </p>
                  <p>
                    <strong>Harga:</strong> Rp{" "}
                    {Number(it.price).toLocaleString()}
                  </p>
                </div>
              ))}

              <p className="mt-2">
                <strong>Metode:</strong> {order.method}
              </p>
              <p className="text-xs text-gray-400 mt-1">{order.date}</p>
            </div>
          ))}
        </div>
    </div>
  );
}
