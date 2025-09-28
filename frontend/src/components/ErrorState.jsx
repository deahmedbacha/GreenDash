export default function ErrorState({ message="Something went wrong." }) {
  return (
    <div className="card p-6 text-red-300">
      {message}
    </div>
  );
}
