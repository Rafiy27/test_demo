const startbutton = document.getElementById('start-btn');
const nextbutton = document.getElementById('next-btn');

const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreElement = document.querySelector('.score'); // Select the score element

let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

// Function to hide the score
function hideScore() {
    scoreElement.classList.add('hide');
}

// Function to show the score
function showScore() {
    scoreElement.classList.remove('hide');
}

// Function to remove 'correct' and 'wrong' classes from all answer buttons
function clearStatusClasses() {
    const buttons = Array.from(answerButtonsElement.children);
    buttons.forEach(button => {
        button.classList.remove('correct', 'wrong');
    });
}

// Function to set 'correct' or 'wrong' class on a specific answer button
function setStatusClass(button, correct) {
    clearStatusClasses();
    if (correct) {
        button.classList.add('correct');
    } else {
        button.classList.add('wrong');
    }
}

// Function called when an answer button is clicked
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    setStatusClass(selectedButton, correct); // Set class on the selected answer button

    // Show next button or restart button based on current question index
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextbutton.classList.remove('hide');
    } else {
        startbutton.innerText = 'Restart';
        startbutton.classList.remove('hide');
        nextbutton.classList.add('hide');
    }

    // Increase quiz score if the selected answer is correct
    if (correct) {
        quizScore++;
    }
    document.getElementById('right-answers').innerText = quizScore; // Update displayed score
}

// Function to reset all answer buttons to initial state
function resetState() {
    clearStatusClasses();
    nextbutton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// Function to display a new question and its answer buttons
function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer); // Attach click event listener
        answerButtonsElement.appendChild(button); // Append button to answer buttons container
    });
}

// Function to set up the next question
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// Function to start the quiz game
function startGame() {
    startbutton.classList.add('hide'); // Hide start button
    scoreElement.classList.remove('hide'); // Show score
    shuffledQuestions = questions.sort(() => Math.random() - 0.5); // Shuffle questions array
    currentQuestionIndex = 0; // Initialize current question index
    questionContainerElement.classList.remove('hide'); // Show question container
    setNextQuestion(); // Display first question
    quizScore = 0; // Reset quiz score
}

// Event listener for start button click
startbutton.addEventListener('click', startGame);

// Event listener for next button click
nextbutton.addEventListener('click', () => {
    currentQuestionIndex++; // Move to next question
    setNextQuestion(); // Display next question
});

// Array of quiz questions
const questions = [
    {
        question: 'Which one of these is a JavaScript Framework?',
        answers: [
            { text: 'React', correct: true },
            { text: 'Angular', correct: false },
            { text: 'Python', correct: false },
            { text: 'None of the above', correct: false }
        ],
    },
    {
        question: 'What is the result of 10 * 5 + 15?',
        answers: [
            { text: '20', correct: false },
            { text: '65', correct: true },
            { text: '30', correct: false },
            { text: '35', correct: false }
        ]
    },
    {
        question: 'Who is the current president of Indonesia?',
        answers: [
            { text: 'Soekarno', correct: false },
            { text: 'Joko Widodo', correct: true },
            { text: 'BJ Habiebie', correct: false },
            { text: 'Budiono', correct: false }
        ]
    },
];