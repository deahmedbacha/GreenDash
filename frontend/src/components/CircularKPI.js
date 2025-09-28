// CircularKPI.js
export default function CircularKPI({ label, value }) {
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-[#48C9B0] to-[#1ABC9C] rounded-full shadow-lg w-32 h-32 mx-auto">
      <span className="text-lg font-semibold text-white">{value}</span>
      <span className="text-xs text-white mt-2">{label}</span>
    </div>
  );
}
