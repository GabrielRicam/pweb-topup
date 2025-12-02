import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function SuccessPage() {
  const location = useLocation();
  const order = location.state?.order;

  // SIMPAN HISTORY SETIAP BERHASIL BAYAR
  useEffect(() => {
    if (!order) return;

    const history = JSON.parse(localStorage.getItem("history")) || [];

    const newEntry = {
      id: Date.now(),
      items: order.items,
      userId: order.userId,
      payment: order.payment,
      total: order.total,
      date: order.date,
    };

    history.push(newEntry);
    localStorage.setItem("history", JSON.stringify(history));
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6 text-center">
        <h1 className="text-3xl font-bold mb-4 text-red-400">Tidak Ada Data</h1>
        <p>Data pesanan tidak ditemukan.</p>
        <Link
          to="/"
          className="bg-blue-600 py-3 rounded-xl font-semibold w-full max-w-sm mx-auto mt-6 block"
        >
          Kembali ke Home
        </Link>
      </div>
    );
  }

  const item = order.items[0];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 text-center">
      <h1 className="text-3xl font-bold mb-4 text-green-400">Pembayaran Berhasil!</h1>

      <p className="text-gray-300 mb-6">Pesanan Anda sedang diproses.</p>

      <div className="bg-gray-800 p-5 rounded-xl text-left max-w-md mx-auto border border-gray-700">
        <p><strong>Game:</strong> {item.game.name}</p>
        <p><strong>Diamond:</strong> {item.diamond}</p>
        <p><strong>Harga:</strong> Rp {item.price.toLocaleString()}</p>
        <p><strong>ID Player:</strong> {order.userId}</p>
        <p><strong>Metode:</strong> {order.payment}</p>
        <p><strong>Total:</strong> Rp {order.total.toLocaleString()}</p>
        <p className="text-gray-400 text-sm mt-2">{order.date}</p>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <Link
          to="/"
          className="bg-blue-600 py-3 rounded-xl font-semibold w-full max-w-sm mx-auto"
        >
          Kembali ke Home
        </Link>

        <Link
          to="/history"
          className="bg-gray-700 py-3 rounded-xl font-semibold w-full max-w-sm mx-auto"
        >
          Lihat Riwayat Pesanan
        </Link>
      </div>
    </div>
  );
}
