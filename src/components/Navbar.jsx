import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const path = location.pathname;

  const menu = [
    { label: "Home", to: "/" },
    { label: "Cart", to: "/cart" },
    { label: "History", to: "/history" },
    { label: "Admin", to: "/admin" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 bg-gray-950/90 backdrop-blur-lg border-b border-gray-800 z-50">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/">
          <h1 className="text-white text-xl font-bold tracking-wide">
            TopUp<span className="text-blue-500">Store</span>
          </h1>
        </Link>


        {/* Menu */}
        <nav className="flex gap-6">
          {menu.map((m) => (
            <Link
              key={m.to}
              to={m.to}
              className={`text-sm font-medium transition ${path === m.to
                  ? "text-blue-400"
                  : "text-gray-300 hover:text-white"
                }`}
            >
              {m.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
