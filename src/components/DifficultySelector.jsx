import React from "react";
import { useQuiz } from "../context/QuizContext";

const DifficultySelector = () => {
  const { selectedDifficulty, setDifficulty } = useQuiz();

  const difficulties = [
    { value: "all", label: "All Levels", color: "from-gray-500 to-gray-600" },
    { value: "easy", label: "Easy", color: "from-green-500 to-green-600" },
    {
      value: "medium",
      label: "Medium",
      color: "from-yellow-500 to-yellow-600",
    },
    { value: "hard", label: "Hard", color: "from-red-500 to-red-600" },
  ];

  const handleDifficultyChange = (difficulty) => {
    setDifficulty(difficulty);
  };

  const handleKeyDown = (event, difficulty) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleDifficultyChange(difficulty);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Choose Difficulty Level
      </h2>
      <div className="flex flex-wrap justify-center gap-3">
        {difficulties.map((difficulty) => (
          <button
            key={difficulty.value}
            onClick={() => handleDifficultyChange(difficulty.value)}
            onKeyDown={(e) => handleKeyDown(e, difficulty.value)}
            className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 ${
              selectedDifficulty === difficulty.value
                ? `bg-gradient-to-r ${difficulty.color} text-white shadow-lg`
                : "bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:shadow-md"
            }`}
            aria-pressed={selectedDifficulty === difficulty.value}
            aria-label={`Select ${difficulty.label} difficulty`}
            role="button"
            tabIndex={0}
          >
            <span className="flex items-center gap-2">
              {difficulty.value !== "all" && (
                <div
                  className={`w-3 h-3 rounded-full ${
                    selectedDifficulty === difficulty.value
                      ? "bg-white"
                      : difficulty.value === "easy"
                      ? "bg-green-500"
                      : difficulty.value === "medium"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                />
              )}
              {difficulty.label}
            </span>

            {/* Selection indicator */}
            {selectedDifficulty === difficulty.value && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Difficulty description */}
      <div className="mt-4 text-center text-gray-600">
        {selectedDifficulty === "all" && (
          <p>
            Mix of easy, medium, and hard questions for a balanced challenge
          </p>
        )}
        {selectedDifficulty === "easy" && (
          <p>
            Perfect for beginners - straightforward questions to build
            confidence
          </p>
        )}
        {selectedDifficulty === "medium" && (
          <p>Intermediate level - requires some knowledge and thinking</p>
        )}
        {selectedDifficulty === "hard" && (
          <p>Expert level - challenging questions for knowledge enthusiasts</p>
        )}
      </div>
    </div>
  );
};

export default DifficultySelector;
