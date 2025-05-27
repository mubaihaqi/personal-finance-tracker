import { Link } from "react-router-dom";
import JawaAnimation from "../components/animations/JawaAnimation.jsx";

export default function NotFound() {
  return (
    <section className="min-h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center rounded-xl p-6 w-full max-w-lg mx-auto bg-transparent">
        <div className="flex items-center justify-center w-full aspect bg-transparent">
          <JawaAnimation />
        </div>
        <h1 className="text-3xl font-bold mt-4 text-gray-700">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-500 mt-2">
          The page you're looking for doesn't exist.
        </p>
        <Link to="/" className="btn btn-outline btn-accent mt-6 rounded-lg">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
