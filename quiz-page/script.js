const quizForm = document.getElementById('quiz-form');
const timerDisplay = document.getElementById('timer');
const questionDisplay = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const resultContainer = document.getElementById('result');
const resultTable = document.getElementById('result-table');

let currentQuestionIndex = 0;
let timeLeft = 10; 
let timer;
let questionStartTime;
const selectedAnswers = [];

    const questions = [
        {
            question: "What does HTML stand for?",
            options: ["Hyper Text Markup Language", "Hyperlink and Text Markup Language", "Highly Textual Modern Language", "Hyperlink Technology Modern Language"],
            correctAnswer: "Hyper Text Markup Language"
        },
        {
            question: "Which HTML tag is used for creating an unordered list?",
            options: ["<ul>", "<ol>", "<li>", "<list>"],
            correctAnswer: "<ul>"
        },
        {
            question: "What does CSS stand for?",
            options: ["Cascading Style Sheet", "Computer Style Sheet", "Creative Style Sheet", "Colorful Style Sheet"],
            correctAnswer: "Cascading Style Sheet"
        },
        {
            question: "Which HTML element is used to define the structure of an HTML document?",
            options: ["<header>", "<body>", "<footer>", "<html>"],
            correctAnswer: "<html>"
        },
        {
            question: "What is the correct way to link an external CSS file to an HTML document?",
            options: ["<style src='styles.css'>", "<link href='styles.css' rel='stylesheet'>", "<css href='styles.css'>", "<link src='styles.css' rel='stylesheet'>"],
            correctAnswer: "<link href='styles.css' rel='stylesheet'>"
        },
        {
            question: "Which CSS property is used to change the background color of an element?",
            options: ["color", "background-color", "text-color", "bgcolor"],
            correctAnswer: "background-color"
        },
        {
            question: "What is the default value of the 'display' property in CSS for most elements?",
            options: ["inline", "block", "inline-block", "none"],
            correctAnswer: "inline"
        },
        {
            question: "Which HTML tag is used to create a hyperlink?",
            options: ["<link>", "<a>", "<href>", "<url>"],
            correctAnswer: "<a>"
        },
        {
            question: "In CSS, what property is used to set the font size of text?",
            options: ["font-size", "text-size", "font-style", "size"],
            correctAnswer: "font-size"
        },
        {
            question: "What does the 'href' attribute in an anchor tag (\<a\>) specify?",
            options: ["The text of the link", "The target of the link", "The style of the link", "The URL of the link"],
            correctAnswer: "The URL of the link"
        },
        {
            question: "Which CSS property is used to add spacing between elements?",
            options: ["margin", "padding", "border", "spacing"],
            correctAnswer: "margin"
        },
        {
            question: "In HTML, which tag is used for creating an ordered list?",
            options: ["<ol>", "<ul>", "<li>", "<list>"],
            correctAnswer: "<ol>"
        },
        {
            question: "What is the purpose of the CSS 'border' property?",
            options: ["To set the background color of an element", "To create a border around an element", "To change the font size of text", "To add spacing between elements"],
            correctAnswer: "To create a border around an element"
        },
        {
            question: "Which HTML tag is used for creating a line break?",
            options: ["<line>", "<br>", "<break>", "<newline>"],
            correctAnswer: "<br>"
        },
        {
            question: "In CSS, which property is used to control the text alignment within an element?",
            options: ["text-align", "alignment", "text-style", "align-text"],
            correctAnswer: "text-align"
        },
        {
            question: "What is the purpose of the 'alt' attribute in an HTML \<img\> tag?",
            options: ["To set the image source", "To specify the image dimensions", "To provide alternative text for the image", "To add a border around the image"],
            correctAnswer: "To provide alternative text for the image"
        },
        {
            question: "Which CSS property is used to change the color of text?",
            options: ["color", "text-color", "font-color", "text-style"],
            correctAnswer: "color"
        },
        {
            question: "In HTML, what does the acronym 'CSS' stand for?",
            options: ["Computer Style Sheet", "Creative Style Sheet", "Cascading Style Sheet", "Colorful Style Sheet"],
            correctAnswer: "Cascading Style Sheet"
        },
        {
            question: "What is the correct way to comment out multiple lines of code in CSS?",
            options: ["/* This is a comment */", "// This is a comment", "<!-- This is a comment -->", "# This is a comment #"],
            correctAnswer: "/* This is a comment */"
        }
    ];
    


function startTimer() {
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerDisplay.textContent = `Time Left: ${timeLeft} seconds`;
        } else {
            clearInterval(timer);
            alert("Time's up!");
            moveToNextQuestion();
        }
    }, 1000);
}

function displayCurrentQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionDisplay.textContent = `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`;
    
    optionsContainer.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('input');
        optionElement.type = 'radio';
        optionElement.name = 'answer';
        optionElement.value = option;
        optionElement.id = `option${index + 1}`; 
        const label = document.createElement('label');
        label.textContent = option;
        label.setAttribute('for', `option${index + 1}`);
        optionsContainer.appendChild(optionElement);
        optionsContainer.appendChild(label);
        optionsContainer.appendChild(document.createElement('br'));
    });
    
    questionStartTime = Date.now();
}




function moveToNextQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    const userAnswer = selectedAnswer ? selectedAnswer.value : "No answer selected";
    
    const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);
    resultTable.innerHTML += `<tr><td>${currentQuestion.question}</td><td>${timeTaken}</td><td>${userAnswer}</td><td>${currentQuestion.correctAnswer}</td></tr>`;
    selectedAnswers.push(userAnswer);
    
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayCurrentQuestion();
        resetTimer();
    } else {
        finishQuiz();
    }
}



function resetTimer() {
    clearInterval(timer);
    timeLeft = 10; 
    timerDisplay.textContent = `Time Left: ${timeLeft} seconds`;
    startTimer();
}

quizForm.addEventListener('submit', (e) => {
    e.preventDefault();
    moveToNextQuestion();
});

function finishQuiz() {
    resultContainer.style.display = 'block';
    document.getElementById('quiz').style.display = 'none';
  
    setTimeout(() => {
        if (currentQuestionIndex < questions.length) {
            moveToNextQuestion();
        }
    }, 3000); 
}

displayCurrentQuestion();
startTimer();
