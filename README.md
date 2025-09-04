# Quiz App

A modern, responsive React Quiz App built with React hooks, Context API, and Tailwind CSS. The app uses a local JSON file with curated questions and provides an engaging quiz experience with scoring and detailed results.

## Features

### 🎯 Core Functionality

- **Dynamic Questions**: Loads 10 multiple-choice questions from local JSON data
- **Single Question Display**: Shows one question at a time for focused learning
- **Answer Selection**: Interactive multiple-choice options with visual feedback
- **Navigation**: Previous/Next navigation between questions
- **Progress Tracking**: Visual progress bar and question counter

### 📊 Scoring & Results

- **Real-time Scoring**: Tracks correct/incorrect answers as you progress
- **Final Score Display**: Shows total score with percentage and performance message
- **Detailed Results**: Comprehensive breakdown of each question with correct answers
- **Answer Comparison**: Highlights your selection vs. correct answer
- **Performance Feedback**: Color-coded results and encouraging messages

### 🎨 User Experience

- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Visual Feedback**: Color-coded options, progress indicators, and status messages
- **Accessibility**: Clear navigation, readable fonts, and intuitive interactions

### 🛠 Technical Features

- **React Hooks**: Uses useState, useEffect, and custom hooks for state management
- **Context API**: Global state management for quiz data and user progress
- **React Router**: Client-side routing between quiz and results pages
- **Tailwind CSS**: Utility-first CSS framework for responsive styling
- **Local Data**: Curated questions from local JSON file with offline support

## Tech Stack

- **Frontend**: React 18 with functional components
- **State Management**: React Context API with useReducer
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Data Source**: Local JSON file with curated questions

## Project Structure

```
src/
├── components/          # React components
│   ├── QuizPage.jsx    # Main quiz interface
│   ├── QuestionCard.jsx # Individual question display
│   ├── ProgressBar.jsx # Progress indicator
│   ├── ResultsPage.jsx # Results and summary
│   ├── LoadingSpinner.jsx # Loading state
│   └── ErrorMessage.jsx # Error handling
├── context/            # Global state management
│   └── QuizContext.jsx # Quiz state and logic
├── data/               # Quiz data
│   └── questions.json  # Curated questions and answers
├── App.jsx            # Main app component with routing
├── main.jsx          # App entry point
└── index.css         # Global styles and Tailwind imports
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd quiz-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## Data Source

The app uses a local JSON file (`src/data/questions.json`) containing 15 carefully curated quiz questions. The data structure provides:

- **Question Types**: Multiple choice questions with 4 options each
- **Categories**: Various topics including Science, Geography, History, Art, Literature, and Mathematics
- **Difficulty Levels**: Easy, Medium, and Hard questions
- **Randomization**: Questions and answer options are shuffled for variety on each quiz attempt

### Data Structure

The JSON file follows a consistent structure for easy maintenance and updates:

```json
{
  "questions": [
    {
      "id": 1,
      "question": "What is the capital of France?",
      "options": ["London", "Berlin", "Paris", "Madrid"],
      "correct_answer": "Paris",
      "category": "Geography",
      "difficulty": "easy"
    }
  ]
}
```

## State Management

The app uses React Context API with useReducer for predictable state management:

### State Structure

```javascript
const initialState = {
  questions: [], // Array of quiz questions
  currentQuestionIndex: 0, // Current question position
  userAnswers: [], // User's selected answers
  score: 0, // Current score
  isLoading: true, // Loading state
  error: null, // Error state
  isQuizComplete: false, // Quiz completion flag
};
```

### Key Actions

- `SET_QUESTIONS`: Load questions from local JSON file
- `SET_ANSWER`: Record user's answer
- `NEXT_QUESTION`: Navigate to next question
- `PREVIOUS_QUESTION`: Navigate to previous question
- `COMPLETE_QUIZ`: Calculate final score
- `RESTART_QUIZ`: Reset quiz state

## Component Architecture

### Presentational Components

- **QuestionCard**: Displays individual questions with interactive options
- **ProgressBar**: Visual progress indicator
- **LoadingSpinner**: Loading state animation
- **ErrorMessage**: Error handling and retry functionality

### Container Components

- **QuizPage**: Main quiz interface with navigation
- **ResultsPage**: Comprehensive results display
- **App**: Main app with routing setup

### Context Provider

- **QuizProvider**: Manages global quiz state and provides methods

## Styling with Tailwind CSS

The app uses Tailwind CSS for responsive, utility-first styling:

- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Color System**: Consistent color palette for UI elements
- **Spacing**: Systematic spacing using Tailwind's spacing scale
- **Animations**: Smooth transitions and hover effects
- **Typography**: Inter font family for excellent readability

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Features

- **Lazy Loading**: Components load only when needed
- **Optimized Re-renders**: Efficient state updates with useReducer
- **Smooth Animations**: CSS transitions for better user experience
- **Responsive Images**: Optimized for different screen sizes

## Future Enhancements

- **Question Categories**: Filter questions by topic
- **Difficulty Selection**: Choose quiz difficulty level
- **Timer**: Add time limits for questions
- **Leaderboards**: Track high scores
- **Offline Support**: Cache questions for offline use
- **Accessibility**: Enhanced screen reader support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Curated quiz questions covering various educational topics
- [React](https://reactjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the fast build tool
