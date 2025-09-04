import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useRef,
} from "react";

const QuizContext = createContext();

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: [],
  score: 0,
  isLoading: true,
  error: null,
  isQuizComplete: false,
  highScore: 0,
  selectedDifficulty: "all", // "easy", "medium", "hard", "all"
  timeRemaining: 30,
  isTimerRunning: false,
  questionStartTime: null,
};

const quizReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false };
    case "SET_QUESTIONS":
      return { ...state, questions: action.payload, isLoading: false };
    case "SET_ANSWER":
      const newUserAnswers = [...state.userAnswers];
      newUserAnswers[state.currentQuestionIndex] = action.payload;
      return { ...state, userAnswers: newUserAnswers };
    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        timeRemaining: 30,
        questionStartTime: Date.now(),
        isTimerRunning: true,
      };
    case "PREVIOUS_QUESTION":
      return {
        ...state,
        currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1),
        timeRemaining: 30,
        questionStartTime: Date.now(),
        isTimerRunning: true,
      };
    case "COMPLETE_QUIZ":
      const correctAnswers = state.questions.reduce(
        (count, question, index) => {
          return (
            count +
            (state.userAnswers[index] === question.correct_answer ? 1 : 0)
          );
        },
        0
      );

      // Check if new score is higher than current high score
      const newHighScore = Math.max(correctAnswers, state.highScore);

      // Update localStorage if new high score
      if (newHighScore > state.highScore) {
        localStorage.setItem("quizHighScore", newHighScore.toString());
      }

      return {
        ...state,
        score: correctAnswers,
        isQuizComplete: true,
        highScore: newHighScore,
        isTimerRunning: false,
      };
    case "RESTART_QUIZ":
      return {
        ...initialState,
        isLoading: true,
        highScore: state.highScore, // Preserve high score on restart
        selectedDifficulty: state.selectedDifficulty, // Preserve difficulty selection
      };
    case "RETRY_LOADING":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "SET_HIGH_SCORE":
      return { ...state, highScore: action.payload };
    case "SET_DIFFICULTY":
      return {
        ...state,
        selectedDifficulty: action.payload,
        isLoading: true, // Trigger reload of questions
      };
    case "UPDATE_TIMER":
      return { ...state, timeRemaining: action.payload };
    case "START_TIMER":
      return {
        ...state,
        isTimerRunning: true,
        questionStartTime: Date.now(),
        timeRemaining: 30,
      };
    case "STOP_TIMER":
      return { ...state, isTimerRunning: false };
    case "AUTO_ANSWER":
      // Auto-select a random answer when time runs out
      const currentQuestion = state.questions[state.currentQuestionIndex];
      if (currentQuestion && !state.userAnswers[state.currentQuestionIndex]) {
        const randomOption =
          currentQuestion.options[
            Math.floor(Math.random() * currentQuestion.options.length)
          ];
        const newUserAnswers = [...state.userAnswers];
        newUserAnswers[state.currentQuestionIndex] = randomOption;
        return {
          ...state,
          userAnswers: newUserAnswers,
          isTimerRunning: false,
        };
      }
      return { ...state, isTimerRunning: false };
    default:
      return state;
  }
};

export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const timerRef = useRef(null);

  // Load high score from localStorage on component mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem("quizHighScore");
    if (savedHighScore) {
      dispatch({
        type: "SET_HIGH_SCORE",
        payload: parseInt(savedHighScore, 10),
      });
    }
  }, []);

  // Timer effect
  useEffect(() => {
    if (state.isTimerRunning && state.timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        dispatch({ type: "UPDATE_TIMER", payload: state.timeRemaining - 1 });
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    } else if (state.timeRemaining === 0 && state.isTimerRunning) {
      // Time's up - auto-answer and move to next question
      dispatch({ type: "AUTO_ANSWER" });
      setTimeout(() => {
        if (state.currentQuestionIndex < state.questions.length - 1) {
          dispatch({ type: "NEXT_QUESTION" });
        } else {
          dispatch({ type: "COMPLETE_QUIZ" });
        }
      }, 1000); // Show auto-answer for 1 second
    }
  }, [
    state.isTimerRunning,
    state.timeRemaining,
    state.currentQuestionIndex,
    state.questions.length,
  ]);

  const loadQuestions = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      // Import the local questions data
      const questionsData = await import("../data/questions.json");

      // Filter questions by difficulty if not "all"
      let filteredQuestions = questionsData.questions;
      if (state.selectedDifficulty !== "all") {
        filteredQuestions = questionsData.questions.filter(
          (question) => question.difficulty === state.selectedDifficulty
        );
      }

      // Shuffle the questions for variety
      const shuffledQuestions = filteredQuestions
        .sort(() => Math.random() - 0.5)
        .slice(0, 10); // Take 10 random questions

      // Shuffle options for each question
      const questionsWithShuffledOptions = shuffledQuestions.map(
        (question) => ({
          ...question,
          options: [...question.options].sort(() => Math.random() - 0.5),
        })
      );

      dispatch({
        type: "SET_QUESTIONS",
        payload: questionsWithShuffledOptions,
      });

      // Start timer for first question
      if (questionsWithShuffledOptions.length > 0) {
        dispatch({ type: "START_TIMER" });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to load questions" });
    }
  };

  useEffect(() => {
    loadQuestions();
  }, [state.selectedDifficulty]);

  const setAnswer = (answer) => {
    dispatch({ type: "SET_ANSWER", payload: answer });
    // Stop timer when answer is selected
    dispatch({ type: "STOP_TIMER" });
  };

  const nextQuestion = () => {
    if (state.currentQuestionIndex < state.questions.length - 1) {
      dispatch({ type: "NEXT_QUESTION" });
    } else {
      dispatch({ type: "COMPLETE_QUIZ" });
    }
  };

  const previousQuestion = () => {
    dispatch({ type: "PREVIOUS_QUESTION" });
  };

  const restartQuiz = () => {
    dispatch({ type: "RESTART_QUIZ" });
    // Load new questions after resetting
    loadQuestions();
  };

  const retryLoading = () => {
    dispatch({ type: "RETRY_LOADING" });
    loadQuestions();
  };

  const clearHighScore = () => {
    localStorage.removeItem("quizHighScore");
    dispatch({ type: "SET_HIGH_SCORE", payload: 0 });
  };

  const setDifficulty = (difficulty) => {
    dispatch({ type: "SET_DIFFICULTY", payload: difficulty });
  };

  const value = {
    ...state,
    setAnswer,
    nextQuestion,
    previousQuestion,
    restartQuiz,
    retryLoading,
    clearHighScore,
    setDifficulty,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
