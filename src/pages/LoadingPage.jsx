export default function LoadingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-gray-900 to-gray-800 text-white">
      
      {/* Animated Glow Ring */}
      <div className="relative">
        <div className="w-28 h-28 rounded-full border-4 border-blue-500 opacity-40 animate-ping"></div>
        <div className="absolute inset-0 w-28 h-28 rounded-full border-4 border-blue-400 animate-spin border-t-transparent"></div>

      </div>

      {/* Typing Text */}
      <p className="mt-6 text-lg font-semibold text-blue-300 tracking-wide animate-pulse">
        Loading...
      </p>
    </div>
  );
}
