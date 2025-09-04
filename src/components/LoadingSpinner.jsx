import React, { useState, useEffect } from "react";
import { useQuiz } from "../context/QuizContext";

const LoadingSpinner = () => {
  const { retryLoading } = useQuiz();
  const [showRetry, setShowRetry] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRetry(true);
    }, 5000); // Show retry button after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-4"></div>
      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        Loading Questions...
      </h2>
      <p className="text-gray-500 mb-6">
        Please wait while we prepare your quiz
      </p>

      {showRetry && (
        <button
          onClick={retryLoading}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          Retry Loading
        </button>
      )}
    </div>
  );
};

export default LoadingSpinner;
