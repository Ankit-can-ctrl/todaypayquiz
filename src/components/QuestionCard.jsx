import React from "react";

const QuestionCard = ({
  question,
  selectedAnswer,
  questionNumber,
  onAnswerSelect,
  isAnswered,
}) => {
  const handleOptionClick = (option) => {
    if (!isAnswered) {
      onAnswerSelect(option);
    }
  };

  const handleKeyDown = (event, option) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!isAnswered) {
        onAnswerSelect(option);
      }
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "hard":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-lg p-8"
      role="region"
      aria-label={`Question ${questionNumber}`}
    >
      {/* Question Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg font-bold">
            {questionNumber}
          </span>
          <span
            className={`text-sm font-medium px-3 py-1 rounded-full border ${getDifficultyColor(
              question.difficulty
            )}`}
          >
            {question.difficulty.charAt(0).toUpperCase() +
              question.difficulty.slice(1)}
          </span>
        </div>
        <div className="text-sm text-gray-500">{question.category}</div>
      </div>

      {/* Question Text */}
      <h2 className="text-xl font-semibold text-gray-800 mb-8 leading-relaxed">
        {question.question}
      </h2>

      {/* Answer Options */}
      <div className="space-y-4" role="radiogroup" aria-label="Answer options">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === question.correct_answer;
          const showCorrectAnswer = isAnswered;

          return (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              onKeyDown={(e) => handleKeyDown(e, option)}
              disabled={isAnswered}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 ${
                !isAnswered
                  ? "border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer"
                  : isSelected && isCorrect
                  ? "border-green-300 bg-green-50 cursor-default"
                  : isSelected && !isCorrect
                  ? "border-red-300 bg-red-50 cursor-default"
                  : showCorrectAnswer && isCorrect
                  ? "border-green-300 bg-green-50 cursor-default"
                  : "border-gray-200 bg-gray-50 cursor-default"
              }`}
              aria-checked={isSelected}
              aria-label={`Option ${index + 1}: ${option}${
                showCorrectAnswer
                  ? isCorrect
                    ? " (Correct answer)"
                    : isSelected
                    ? " (Your answer)"
                    : ""
                  : ""
              }`}
              role="radio"
              tabIndex={isAnswered ? -1 : 0}
            >
              <div className="flex items-center gap-4">
                {/* Radio Button */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${
                    !isAnswered
                      ? "border-gray-400"
                      : isSelected && isCorrect
                      ? "border-green-500 bg-green-500"
                      : isSelected && !isCorrect
                      ? "border-red-500 bg-red-500"
                      : showCorrectAnswer && isCorrect
                      ? "border-green-500 bg-green-500"
                      : "border-gray-400"
                  }`}
                >
                  {((isSelected && isCorrect) ||
                    (showCorrectAnswer && isCorrect)) && (
                    <div className="w-2 h-2 bg-white rounded-full m-auto"></div>
                  )}
                  {isSelected && !isCorrect && (
                    <div className="w-2 h-2 bg-white rounded-full m-auto"></div>
                  )}
                </div>

                {/* Option Text */}
                <span
                  className={`font-medium ${
                    !isAnswered
                      ? "text-gray-700"
                      : isSelected && isCorrect
                      ? "text-green-700"
                      : isSelected && !isCorrect
                      ? "text-red-700"
                      : showCorrectAnswer && isCorrect
                      ? "text-green-700"
                      : "text-gray-700"
                  }`}
                >
                  {option}
                </span>

                {/* Answer Indicators */}
                {showCorrectAnswer && (
                  <div className="ml-auto">
                    {isCorrect && (
                      <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Correct
                      </span>
                    )}
                    {isSelected && !isCorrect && (
                      <span className="inline-flex items-center gap-1 text-red-600 font-medium">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Your Answer
                      </span>
                    )}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
