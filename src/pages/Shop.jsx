import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingPage from "./LoadingPage";
export default function Shop({ game }) {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (game.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [game]);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-gray-800 text-white p-6">

      {loading ? <LoadingPage /> : (
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Pilih Game</h1>
          <p className="text-4xl font-bold mb-8">Game list</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {game.map(g => (
              <Link
                key={g.id}
                to="/game"
                state={{ game: { name: g.name, image: g.image, currency: g.currency } }}
                className="group relative bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-700">
                  <img
                    src={g.image}
                    alt={g.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="p-4">
                  <h2 className="text-lg font-semibold group-hover:text-blue-400 transition-colors duration-300">
                    {`${g.name.substring(0, g.name.indexOf(' '))} ${g.name.substring(g.name.indexOf(' ') + 1)}`}
                  </h2>
                </div>

              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

