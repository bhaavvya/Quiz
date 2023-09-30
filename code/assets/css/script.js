

const main = document.querySelector("main");

const start = document.querySelector(".start");
const time = document.querySelector(".time");
const leaderboard = document.querySelector("#leaderboard");

function generateQuiz({ question, options, answer }) {
  let isChoose = false;
  const handleClick = (e) => {
    // alert("handle click");
    if (isChoose) return;
    isChoose = true;
    const opt = e.target;
    displayAnswer(opt.dataset.idx == answer);
    setTimeout(
      () =>
        next >= quiz.length || Number(time.textContent) <= 0
          ? displayScore()
          : updateQuiz(next++),
      1000
    );
  };
  main.innerHTML = "";

  const queDiv = document.createElement("div");
  queDiv.classList.add("question");
  queDiv.textContent = question;

  const optionsDiv = document.createElement("div");
  optionsDiv.addEventListener("click", handleClick);
  options.forEach((opt, idx) => {
    const optDiv = document.createElement("div");
    optDiv.classList.add("option");
    optDiv.dataset.idx = idx + 1;
    optDiv.textContent = opt;
    optionsDiv.append(optDiv);
  });

  main.append(queDiv);
  main.append(optionsDiv);
}

function handleSubmit(e) {
  e.preventDefault();
  alert("submit");
  const initials = document.querySelector('input[name="initials"]').value;
  const history = JSON.parse(localStorage.getItem("leaderboard")) || [];
  console.log("history: ", history);
  history.push({ name: initials, score: time.textContent });
  localStorage.setItem("leaderboard", JSON.stringify(history));
}
function displayScore() {
  clearInterval(timeId);
  main.innerHTML = `
    <h1>All done!</h1>
    <p class="show_score">Your final score is ${time.textContent}.</p>
    <form>
        <label>
            Enter initials: <input type="text" name="initials">
        </label>
        <button class="submit">Submit</button>
    </form>    
    `;
  main.querySelector(".submit").addEventListener("click", handleSubmit);
}
function displayAnswer(isCorrect) {
  if (!isCorrect) time.textContent = time.textContent - 10;
  const answerDiv = document.createElement("div");
  answerDiv.classList.add("answer");
  answerDiv.textContent = isCorrect ? "correct!" : "Incorrect!";
  main.append(answerDiv);
}
function updateQuiz(next) {
  generateQuiz(quiz[next]);
}

const quiz = [
  {
    question: "Arrays in JavaScript can be used to store ________.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: 4,
  },
  {
    question: "JavaScript is a ________-side programming language.",
    options: [
      "1. server",
      "2. client",
      "3. both",
      "4. non of the above",
    ],
    answer: 3,
  },
  {
    question: "What does HTML stand for?",
    options: [
      "1. Hyper Text Markup Language",
      "2. High Tech Modern Language",
      "3. Hyperlink and Text Markup Language",
      "4. all of the above",
    ],
    answer: 1,
  },
  {
    question: "In Python, which keyword is used to define a function?",
    options: [
      "1. fun",
      "2. def",
      "3. booleans",
      "4. all of the above",
    ],
    answer: 2,
  },
  {
    question: "Which of the following is not a programming language?",
    options: [
      "1. Python",
      "2. HTML",
      "3. C++",
      "4. all of the above",
    ],
    answer: 2,
  },
  {
    question: `What is the result of 10 + "5" in JavaScript?`,
    options: [
      "1. 10",
      "2. 15",
      "3. 105",
      "4. all of the above",
    ],
    answer: 3,
  },
  {
    question: "What is the primary purpose of CSS?",
    options: [
      "1. styling web pages",
      "2. numbers and strings",
      "3. booleans",
      "4. all of the above",
    ],
    answer: 1,
  },
  {
    question: "Which data type is used to represent a true or false value in Python?",
    options: [
      "1. other arrays",
      "2. numbers and strings",
      "3. booleans",
      "4. all of the above",
    ],
    answer: 3,
  },
  {
    question: "What does SQL stand for?",
    options: [
      "1. Structured Query Language",
      "2. numbers and strings",
      "3. booleans",
      "4. all of the above",
    ],
    answer: 1,
  },
  {
    question: "what is this",
    options: [
      "1. quiz",
      "2. numbers and strings",
      "3. to make decisions based on conditions",
      "4. all of the above",
    ],
    answer: 3,
  },
  {
    question: "What is the purpose of a loop in programming?",
    options: [
      "1. To define a function",
      "2. To create addition statement",
      "3. To repeat a block of code several number of times",
      "4. all of the above",
    ],
    answer: 3,
  },
  {
    question: "Which programming language is known for its use in developing mobile applications",
    options: [
      "1. HTML",
      "2. Swift",
      "3. Javacript",
      "4. C#",
    ],
    answer: 2,
  },
  {
    question: "What is the purpose of the border property in CSS",
    options: [
      "1. To set the background color of an element",
      "2. To create a border around an HTML element",
      "3. To change the font size of text",
      "4. To define a variable in CSS",
    ],
    answer: 2,
  },
  {
    question: "Which of the following is a dynamically typed programming language",
    options: [
      "1. Python",
      "2. Ruby",
      "3. C++",
      "4. Java",
    ],
    answer: 1,
  },
  {
    question: "What is the purpose of a gitignore file in a Git repository",
    options: [
      "1. To store the Git commit history",
      "2. To define a new branch in Git",
      "3. To specify which files and directories should be excluded from version control",
      "4. To merge multiple repositories together",
    ],
    answer: 3,
  },

];

let next = 1;
let timeId = null;

function goBack() {
  main.innerHTML = `
  <h1>Coding Quiz Challange</h1>
        <p class="description">Try to answer to following code-related questions within the
            time limit.<br>
            Keep in mind that incorect answers will penalize your 
            score/time by ten seconds!
        </p>
        <button class="start">Start Quiz</button>
  `;
  main.querySelector(".start").addEventListener("click", () => {
    console.log("Start button clicked"); // Add this line for debugging
    generateQuiz(quiz[0]);
    time.textContent = "50";
    next = 1;
    timeId = setInterval(() => (time.textContent -= 1), 1000);
  });
}

function displayLeaderboard() {
  main.innerHTML = `
     <h1>Highscores</h1>
    <div class="leaderboard_show">
    ${(JSON.parse(localStorage.getItem("leaderboard")) || [])
      .sort((a, b) => b.score - a.score)
      .map((item, idx) => {
        return `<div>${idx + 1}. ${item.name} - ${item.score}</div>`;
      })
      .join("")}
    </div>
    <button id="go_back">Go Back</button>
    <button id="clear_highscores">Clear Highscores</button>
  `;
  main.querySelector("#go_back").addEventListener("click", goBack);
  main.querySelector("#clear_highscores").addEventListener("click", () => {
    localStorage.clear();
    alert("clear all highscores");
  });
}
leaderboard.addEventListener("click", displayLeaderboard);

// Initial
goBack();
