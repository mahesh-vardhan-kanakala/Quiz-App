const questions = [
    {
        category: "Science",
        question: "What is the chemical symbol for water?",
        options: ["H2O", "O2", "CO2", "N2"],
        correctAnswer: "H2O"
    },
    {
        category: "Math",
        question: "What is 5 + 7?",
        options: ["10", "12", "14", "15"],
        correctAnswer: "12"
    },
    {
        category: "History",
        question: "Who was the first president of the United States?",
        options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"],
        correctAnswer: "George Washington"
    },
    {
        category: "Geography",
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "Paris"
    },
    {
        category: "Literature",
        question: "Who wrote 'Hamlet'?",
        options: ["Charles Dickens", "Jane Austen", "William Shakespeare", "Mark Twain"],
        correctAnswer: "William Shakespeare"
    },
    // Add more questions as needed...
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeRemaining = 30;

const startButton = document.getElementById('start-button');
const quizContainer = document.getElementById('quiz');
const questionContainer = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');
const resultContainer = document.getElementById('result-container');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const timerDisplay = document.getElementById('time');
const progressBar = document.getElementById('progress-bar');

startButton.onclick = startQuiz;

function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    timeRemaining = 30;
    startButton.classList.add('hidden');  // Hide start button
    nextButton.classList.add('hidden');
    resultContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    loadQuestion();
    startTimer();
}

function loadQuestion() {
    resetTimer(); // Reset timer each time a new question loads
    const questionData = questions[currentQuestionIndex];

    questionContainer.innerText = questionData.question; // Display the question

    optionsContainer.innerHTML = ''; // Clear previous options
    questionData.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.onclick = () => selectAnswer(option);
        optionsContainer.appendChild(button);
    });

    updateProgressBar();
}

function selectAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    if (selectedOption === correctAnswer) {
        score++;
    }

    if (currentQuestionIndex < questions.length - 1) {
        nextButton.classList.remove('hidden');
    } else {
        endQuiz();
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
    nextButton.classList.add('hidden'); // Hide next button until the next question loads
}

function endQuiz() {
    clearInterval(timer);
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    scoreDisplay.innerText = score;

    const highScore = localStorage.getItem('highScore') || 0;
    highScoreDisplay.innerText = highScore;

    if (score > highScore) {
        localStorage.setItem('highScore', score);
    }
}

function startTimer() {
    timer = setInterval(() => {
        timeRemaining--;
        timerDisplay.innerText = timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            selectAnswer(null); // Automatically select an answer if time runs out
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeRemaining = 30;
    timerDisplay.innerText = timeRemaining;
    startTimer();
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Event listeners
nextButton.onclick = nextQuestion;
document.getElementById('restart-button').onclick = startQuiz;
