import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from; // "diamond" or undefined
  const diamondData = location.state?.selected;
  const gameData = location.state?.game;

  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState("");
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    if (from !== "diamond") {
      const saved = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(saved);
    }
  }, [from]);

  const paymentMethods = [
    { id: "ovo", name: "OVO" },
    { id: "gopay", name: "GoPay" },
    { id: "shopeepay", name: "ShopeePay" },
    { id: "qris", name: "QRIS" },
  ];

  const total =
    from === "diamond"
      ? diamondData.price
      : cart.reduce((sum, item) => sum + Number(item.price || 0) * (item.qty || 1), 0);

  const handlePay = () => {
    if (!userId || !payment) {
      alert("Isi ID + metode pembayaran!");
      return;
    }

    let order;

    // BELI LANGSUNG DARI DIAMOND PAGE
    if (from === "diamond") {
      order = {
        id: Date.now(),
        items: [
          {
            game: gameData,
            diamond: diamondData.amount,
            price: diamondData.price,
            qty: 1,
          },
        ],
        userId,
        payment,
        total,
        date: new Date().toLocaleString(),
      };
    } 
    
    // BELI DARI CART
    else {
      order = {
        id: Date.now(),
        items: cart,
        userId,
        payment,
        total,
        date: new Date().toLocaleString(),
      };

      // Update stok
      try {
        const raw = JSON.parse(localStorage.getItem("diamondItems")) || {};
        cart.forEach((c) => {
          const g = raw[c.game.name];
          if (g) {
            g.items = g.items.map((it) => {
              if (it.amount === c.diamond) {
                return { ...it, stock: Math.max(0, (it.stock || 0) - (c.qty || 1)) };
              }
              return it;
            });
          }
        });
        localStorage.setItem("diamondItems", JSON.stringify(raw));
      } catch (e) {
        console.error("update stock failed", e);
      }
    }

    // ================================
    // 🔧 NORMALISASI AGAR HISTORY RAPI
    // ================================
    order.items = order.items.map((it) => ({
      game: it.game,
      diamond: Number(it.diamond),
      price: Number(it.price),
      qty: it.qty ? Number(it.qty) : 1,
    }));

    // SIMPAN KE HISTORY
    const history = JSON.parse(localStorage.getItem("history")) || [];
    history.push(order);
    localStorage.setItem("history", JSON.stringify(history));

    // KOSONGKAN CART SETELAH BAYAR
    if (from !== "diamond") {
      localStorage.removeItem("cart");
    }

    navigate("/success", { state: { order } });
  };

  const items =
    from === "diamond"
      ? [{ game: gameData, diamond: diamondData.amount, price: diamondData.price }]
      : cart;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <p>Keranjang kosong. Silakan pilih item dulu.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Pembayaran</h1>

      {items.map((item, i) => (
        <div
          key={i}
          className="bg-gray-800 p-4 mb-3 rounded-xl border border-gray-700"
        >
          <p className="font-bold">{item.game?.name}</p>
          <p>{item.diamond} Diamond</p>
          <p className="text-blue-400">
            Rp {Number(item.price).toLocaleString()}
          </p>
        </div>
      ))}

      <h2 className="text-xl font-bold mt-2 mb-4">
        Total: Rp {Number(total).toLocaleString()}
      </h2>

      <input
        className="w-full p-3 bg-gray-800 mb-4 rounded-xl border border-gray-700"
        placeholder="Masukkan ID Player..."
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-3 mb-20">
        {paymentMethods.map((m) => (
          <div
            key={m.id}
            className={`p-4 rounded-xl border text-center cursor-pointer ${
              payment === m.id ? "border-blue-500" : "border-gray-600"
            }`}
            onClick={() => setPayment(m.id)}
          >
            {m.name}
          </div>
        ))}
      </div>

      <button
        onClick={handlePay}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 w-72 bg-blue-600 py-3 text-center rounded-xl font-semibold"
      >
        Bayar Sekarang
      </button>
    </div>
  );
}
