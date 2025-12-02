import { useLocation } from "react-router-dom";

export default function ConfirmPage() {
  const location = useLocation();
  const { game, selected, method, playerId } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 text-center">

      <h1 className="text-2xl font-bold mb-4">Scan QR Pembayaran</h1>

      <p>Game: {game?.name}</p>
      <p>Jumlah: {selected?.amount} Diamond</p>
      <p>Harga: Rp {selected?.price.toLocaleString()}</p>
      <p>Metode: {method?.name}</p>
      <p>ID Player: {playerId}</p>

      <img
        src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=PAYMENT"
        className="mx-auto mt-6 rounded-lg"
      />

      <p className="mt-4 text-gray-400">Silakan scan QR untuk menyelesaikan pembayaran</p>
    </div>
  );
}
