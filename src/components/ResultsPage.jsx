import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";

const ResultsPage = () => {
  const navigate = useNavigate();
  const {
    questions,
    userAnswers,
    score,
    highScore,
    restartQuiz,
    selectedDifficulty,
  } = useQuiz();

  const handleRestart = () => {
    restartQuiz();
    navigate("/quiz");
  };

  const getScoreColor = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return "Excellent! Great job!";
    if (percentage >= 60) return "Good work! Keep learning!";
    if (percentage >= 40) return "Not bad! Room for improvement.";
    return "Keep practicing! You can do better!";
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

  const isNewHighScore = score > highScore;
  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="max-w-4xl mx-auto" role="main" aria-label="Quiz Results">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Quiz Results</h1>
        <p className="text-gray-600">Here's how you performed</p>

        {/* Difficulty Badge */}
        {selectedDifficulty !== "all" && (
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium">
            <span>Difficulty:</span>
            <span
              className={`px-3 py-1 rounded-full border ${getDifficultyColor(
                selectedDifficulty
              )}`}
            >
              {selectedDifficulty.charAt(0).toUpperCase() +
                selectedDifficulty.slice(1)}
            </span>
          </div>
        )}
      </div>

      {/* Score Summary */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8 text-center">
        {/* New High Score Banner */}
        {isNewHighScore && (
          <div className="mb-6 p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg text-white">
            <div className="flex items-center justify-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xl font-bold">🎉 NEW HIGH SCORE! 🎉</span>
            </div>
          </div>
        )}

        <div className="mb-6">
          <div
            className={`text-6xl font-bold ${getScoreColor(
              score,
              questions.length
            )} mb-2`}
          >
            {score}/{questions.length}
          </div>
          <div className="text-2xl font-semibold text-gray-700 mb-2">
            {percentage}%
          </div>
          <p className="text-lg text-gray-600">
            {getScoreMessage(score, questions.length)}
          </p>
        </div>

        {/* High Score Display */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-lg font-semibold text-blue-800">
              {isNewHighScore ? "New High Score!" : "High Score"}
            </span>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {highScore}/{questions.length} (
            {Math.round((highScore / questions.length) * 100)}%)
          </div>
        </div>

        {/* Score Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
          <div
            className={`h-4 rounded-full transition-all duration-1000 ${
              score === questions.length
                ? "bg-green-500"
                : score / questions.length >= 0.6
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
            style={{ width: `${(score / questions.length) * 100}%` }}
          />
        </div>

        <button
          onClick={handleRestart}
          className="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2"
          aria-label="Take the quiz again"
        >
          Take Quiz Again
        </button>
      </div>

      {/* Detailed Results */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Question Summary
        </h2>
        <div className="space-y-6">
          {questions.map((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correct_answer;
            const hasAnswered = userAnswer !== undefined;

            return (
              <div
                key={index}
                className={`p-6 rounded-lg border-2 ${
                  !hasAnswered
                    ? "border-gray-200 bg-gray-50"
                    : isCorrect
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        !hasAnswered
                          ? "bg-gray-300 text-gray-600"
                          : isCorrect
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span
                      className={`text-sm font-medium px-3 py-1 rounded-full ${
                        !hasAnswered
                          ? "bg-gray-200 text-gray-600"
                          : isCorrect
                          ? "bg-green-200 text-green-700"
                          : "bg-red-200 text-red-700"
                      }`}
                    >
                      {question.category}
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
                  {hasAnswered && (
                    <div
                      className={`flex items-center gap-2 ${
                        isCorrect ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="font-medium">Correct</span>
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="font-medium">Incorrect</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {question.question}
                </h3>

                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`p-3 rounded-lg border ${
                        option === question.correct_answer
                          ? "border-green-300 bg-green-100"
                          : option === userAnswer && !isCorrect
                          ? "border-red-300 bg-red-100"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                            option === question.correct_answer
                              ? "border-green-500 bg-green-500"
                              : option === userAnswer && !isCorrect
                              ? "border-red-500 bg-red-500"
                              : "border-gray-400"
                          }`}
                        >
                          {option === question.correct_answer && (
                            <div className="w-2 h-2 bg-white rounded-full m-auto"></div>
                          )}
                          {option === userAnswer && !isCorrect && (
                            <div className="w-2 h-2 bg-white rounded-full m-auto"></div>
                          )}
                        </div>
                        <span
                          className={`font-medium ${
                            option === question.correct_answer
                              ? "text-green-700"
                              : option === userAnswer && !isCorrect
                              ? "text-red-700"
                              : "text-gray-700"
                          }`}
                        >
                          {option}
                        </span>
                        {option === question.correct_answer && (
                          <span className="ml-auto text-green-600 font-medium">
                            Correct Answer
                          </span>
                        )}
                        {option === userAnswer && !isCorrect && (
                          <span className="ml-auto text-red-600 font-medium">
                            Your Answer
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {!hasAnswered && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2 text-yellow-700">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm">Question not answered</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
