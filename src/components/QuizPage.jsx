import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import Timer from "./Timer";

const QuizPage = () => {
  const navigate = useNavigate();
  const {
    questions,
    currentQuestionIndex,
    userAnswers,
    isLoading,
    error,
    isQuizComplete,
    nextQuestion,
    previousQuestion,
    setAnswer,
    highScore,
    timeRemaining,
    isTimerRunning,
  } = useQuiz();

  // Navigate to results when quiz is complete
  useEffect(() => {
    if (isQuizComplete) {
      navigate("/results");
    }
  }, [isQuizComplete, navigate]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          if (currentQuestionIndex > 0) {
            event.preventDefault();
            previousQuestion();
          }
          break;
        case "ArrowRight":
          if (
            currentQuestionIndex < questions.length - 1 &&
            userAnswers[currentQuestionIndex]
          ) {
            event.preventDefault();
            nextQuestion();
          }
          break;
        case "1":
        case "2":
        case "3":
        case "4":
          if (!userAnswers[currentQuestionIndex]) {
            event.preventDefault();
            const optionIndex = parseInt(event.key) - 1;
            if (questions[currentQuestionIndex]?.options[optionIndex]) {
              setAnswer(questions[currentQuestionIndex].options[optionIndex]);
            }
          }
          break;
        case "Enter":
          if (userAnswers[currentQuestionIndex]) {
            event.preventDefault();
            if (currentQuestionIndex < questions.length - 1) {
              nextQuestion();
            } else {
              // Complete quiz
              nextQuestion();
            }
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    currentQuestionIndex,
    questions,
    userAnswers,
    nextQuestion,
    previousQuestion,
    setAnswer,
  ]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (questions.length === 0) {
    return <ErrorMessage message="No questions available" />;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const hasAnswered = userAnswers[currentQuestionIndex] !== undefined;
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSelect = (answer) => {
    setAnswer(answer);
  };

  return (
    <div className="max-w-4xl mx-auto p-6" role="main" aria-label="Quiz">
      {/* Header with High Score and Timer */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Quiz</h1>
          <div className="flex items-center gap-4">
            {/* High Score Display */}
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium text-blue-800">
                High Score:
              </span>
              <span className="text-lg font-bold text-blue-600">
                {highScore}/{questions.length}
              </span>
            </div>

            {/* Timer */}
            <Timer />
          </div>
        </div>

        <ProgressBar progress={progress} />
        <div className="text-center text-gray-600 mt-2">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
      </div>

      {/* Question Card */}
      <QuestionCard
        question={currentQuestion}
        selectedAnswer={userAnswers[currentQuestionIndex]}
        questionNumber={currentQuestionIndex + 1}
        onAnswerSelect={handleAnswerSelect}
        isAnswered={hasAnswered}
      />

      {/* Navigation */}
      <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
        <div className="flex justify-between items-center">
          <button
            onClick={previousQuestion}
            disabled={isFirstQuestion}
            className={`px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 ${
              isFirstQuestion
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-500 text-white hover:bg-gray-600"
            }`}
            aria-label={
              isFirstQuestion
                ? "Cannot go back - first question"
                : "Go to previous question"
            }
            tabIndex={isFirstQuestion ? -1 : 0}
          >
            Previous
          </button>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              {userAnswers.filter((answer) => answer !== undefined).length} of{" "}
              {questions.length} answered
            </span>
            <div className="text-xs text-gray-500 mt-1">
              Use arrow keys to navigate, 1-4 to select answers
            </div>
          </div>

          <button
            onClick={nextQuestion}
            disabled={!hasAnswered}
            className={`px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 ${
              !hasAnswered
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : isLastQuestion
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            aria-label={
              !hasAnswered
                ? "Please select an answer first"
                : isLastQuestion
                ? "Finish quiz"
                : "Go to next question"
            }
            tabIndex={!hasAnswered ? -1 : 0}
          >
            {isLastQuestion ? "Finish Quiz" : "Next"}
          </button>
        </div>
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          Keyboard Shortcuts:
        </h3>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div>← → Arrow keys: Navigate questions</div>
          <div>1-4: Select answer options</div>
          <div>Enter: Confirm and continue</div>
          <div>Tab: Navigate between elements</div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
