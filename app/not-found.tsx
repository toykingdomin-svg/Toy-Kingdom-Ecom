import Link from "next/link";

export default function NotFound() {
  return (
    <div className="tk-container py-20 text-center">
      <div className="text-6xl mb-4">🧸</div>
      <h1 className="font-fredoka uppercase text-3xl text-tk-black">
        Lost in Toyland
      </h1>
      <p className="font-poppins text-tk-gray mt-2">
        We couldn't find that page.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center bg-tk-red text-white px-6 h-12 rounded-md font-fredoka uppercase tracking-wide hover:bg-tk-red-dk mt-5"
      >
        Back Home
      </Link>
    </div>
  );
}
