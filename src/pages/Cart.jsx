import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Keranjang</h1>

      {cart.length === 0 ? (
        <p>Keranjang masih kosong.</p>
      ) : (
        <>
          {cart.map((item, i) => (
            <div key={i} className="bg-gray-800 p-4 rounded-xl mb-3">
              <p className="font-bold">{item.game.name}</p>
              <p>{item.diamond} Diamond</p>
              <p>Rp {item.price.toLocaleString()}</p>
            </div>
          ))}

          <h2 className="text-xl font-bold mt-4">
            Total: Rp {total.toLocaleString()}
          </h2>

          <Link
            to="/payment"
            className="block bg-blue-500 text-center mt-6 p-3 rounded-xl hover:bg-blue-600"
          >
            Proceed to Payment
          </Link>
        </>
      )}
    </div>
  );
}
