import React from "react";
import { Link } from "react-router";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 text-base-content p-4">
      <div className="text-center max-w-lg w-full p-8 bg-base-200 rounded-xl shadow-2xl border-t-4 border-primary">
        <FaExclamationTriangle className="text-error text-6xl mx-auto mb-4 animate-bounce" />
        <h1 className="text-8xl font-extrabold text-primary mb-2">404</h1>

        <h2 className="text-3xl font-semibold mb-4">Oops! Page Not Found</h2>
        <p className="text-lg text-base-content/80 mb-8">
          It looks like the page you were trying to reach took an unexpected
          detour. Don't worry, we all get lost sometimes.
        </p>

        <Link
          to="/"
          className="btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-xl transition duration-300"
        >
          <FaHome />
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
