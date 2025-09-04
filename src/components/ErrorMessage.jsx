import React from "react";
import { useQuiz } from "../context/QuizContext";

const ErrorMessage = ({ message }) => {
  const { retryLoading } = useQuiz();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <svg
          className="w-8 h-8 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        Something went wrong
      </h2>
      <p className="text-gray-500 text-center max-w-md">{message}</p>
      <button
        onClick={retryLoading}
        className="mt-6 py-3 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorMessage;
