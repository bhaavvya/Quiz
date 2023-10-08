
const main = document.querySelector("main");

const start = document.querySelector(".start");
const time = document.querySelector(".time");
const leaderboard = document.querySelector("#leaderboard");
let newScore = 0;
function generateQuiz({ question, options, answer }) {
  let isChoose = false;
  const handleClick = (e) => {
    // alert("handle click");
    if (isChoose) return;
    isChoose = true;
    const opt = e.target;
    displayAnswer(opt.dataset.idx == answer);

    setTimeout(() => {
      if (next >= quiz.length || Number(time.textContent) <= 0) {
        clearInterval(timeId); // Clear the interval if time is 0 or negative
        time.textContent = "0";
        displayScore();
      } else {
        updateQuiz(next++);
      }
    }, 1000);
  };
  main.innerHTML = "";

  const resetBtn = document.createElement("div");
  resetBtn.classList.add("reset-btn-div");
  resetBtn.innerHTML = `<button id="reset_btn" class="reset_btn">Reset</button>`;
  resetBtn.querySelector("#reset_btn").addEventListener("click", goBack);

  const queDiv = document.createElement("div");
  queDiv.classList.add("question");
  queDiv.textContent = question;

  const queWithbtn = document.createElement("div");
  queWithbtn.classList.add("question-with-btn");
  queWithbtn.append(queDiv, resetBtn);

  const optionsDiv = document.createElement("div");
  optionsDiv.addEventListener("click", handleClick);
  options.forEach((opt, idx) => {
    const optDiv = document.createElement("div");
    optDiv.classList.add("option");
    optDiv.dataset.idx = idx + 1;
    optDiv.textContent = opt;
    optionsDiv.append(optDiv);
  });


  main.append(queWithbtn);
  main.append(optionsDiv);
}

function handleSubmit(e) {
  e.preventDefault();
  const clickSubmit = confirm("submit"); //store the value of the confirm() alert

  // if the value of clickSubmit is true, executed the code below
  if (clickSubmit) {
    const initials = document.querySelector('input[name="initials"]').value;
    const history = JSON.parse(localStorage.getItem("leaderboard")) || [];
    console.log("history: ", history);
    history.push({ name: initials, score: newScore });
    localStorage.setItem("leaderboard", JSON.stringify(history));
  }
}
function displayScore() {
  clearInterval(timeId);
  main.innerHTML = `
    <h1>All done!</h1>
    <p class="show_score">Your final score is ${newScore}.</p>
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
  if (isCorrect) newScore++;
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
    options: ["1. server", "2. client", "3. both", "4. non of the above"],
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
    options: ["1. fun", "2. def", "3. booleans", "4. all of the above"],
    answer: 2,
  },
  {
    question: "Which of the following is not a programming language?",
    options: ["1. Python", "2. HTML", "3. C++", "4. all of the above"],
    answer: 2,
  },
  {
    question: `What is the result of 10 + "5" in JavaScript?`,
    options: ["1. 10", "2. 15", "3. 105", "4. all of the above"],
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
    question:
      "Which data type is used to represent a true or false value in Python?",
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
];

let next = 1;
let timeId = null;

function goBack() {
  main.innerHTML = `
  <h1>Coding Trivia Quiz</h1>
        <p class="description">Can you tackle these programming questions within the time? Get ready to SPEEDRUN!
        </p>
        <p class="description" id="warning"><strong>Keep in mind</strong> Incorrect answers will result in a time penalty of ten seconds!</p>
        <button class="start">Start Quiz</button>
  `;
  time.textContent = "50";
  main.querySelector(".start").addEventListener("click", () => {
    generateQuiz(quiz[0]);
    time.textContent = "50";
    next = 1;
    timeId = setInterval(() => {
      if (Number(time.textContent) > 0) {
          time.textContent -= 1;
      } else {
          clearInterval(timeId); // Clear the interval when the timer reaches 0
          time.textContent = "0";
          displayScore(); // Call a function to display the user's score or end the quiz
      }
  }, 1000);
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
    const clickClear = confirm("clear all highscores") //Store the value of confirm()

    // if the value of clickClear is true, execute the code below.
    if (clickClear) {
      localStorage.clear();
    }
  });
}
leaderboard.addEventListener("click", displayLeaderboard);

// Initial
goBack();

document.querySelector("#reset_btn_nav").addEventListener("click", goBack);
