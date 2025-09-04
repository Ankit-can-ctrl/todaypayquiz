import React from "react";
import { useQuiz } from "../context/QuizContext";

const Timer = () => {
  const { timeRemaining, isTimerRunning } = useQuiz();

  // Calculate timer color based on remaining time
  const getTimerColor = () => {
    if (timeRemaining > 20) return "text-green-600";
    if (timeRemaining > 10) return "text-yellow-600";
    return "text-red-600";
  };

  // Calculate timer background color
  const getTimerBgColor = () => {
    if (timeRemaining > 20) return "bg-green-100";
    if (timeRemaining > 10) return "bg-yellow-100";
    return "bg-red-100";
  };

  // Calculate timer border color
  const getTimerBorderColor = () => {
    if (timeRemaining > 20) return "border-green-300";
    if (timeRemaining > 10) return "border-yellow-300";
    return "border-red-300";
  };

  // Calculate progress percentage
  const progressPercentage = (timeRemaining / 30) * 100;

  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-full border-2 ${getTimerBgColor()} ${getTimerBorderColor()} transition-all duration-300`}
      role="timer"
      aria-live="polite"
      aria-label={`Time remaining: ${timeRemaining} seconds`}
    >
      {/* Timer Icon */}
      <svg
        className={`w-5 h-5 ${getTimerColor()}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      {/* Timer Display */}
      <div className="flex items-center gap-2">
        <span className={`text-lg font-bold ${getTimerColor()}`}>
          {timeRemaining.toString().padStart(2, "0")}
        </span>
        <span className="text-sm text-gray-600">sec</span>
      </div>

      {/* Progress Bar */}
      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ${
            timeRemaining > 20
              ? "bg-green-500"
              : timeRemaining > 10
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
          style={{ width: `${progressPercentage}%` }}
          aria-hidden="true"
        />
      </div>

      {/* Urgency Indicator */}
      {timeRemaining <= 10 && (
        <div className="animate-pulse">
          <svg
            className="w-4 h-4 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Timer;
