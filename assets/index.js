//Globals

let time = 60;
let wrongAnswer = undefined;
let qNo = 0;
let score = 0;

//Selectors

const front = document.querySelector("#startQuiz");
const startBtn = document.querySelector("#startBtn");
const ques = document.querySelector("#showQuiz h3");
const choices = document.querySelectorAll("#showQuiz #wrapper p");
const timer = document.querySelector("#countTime");
const skipQues = document.querySelector("#skipQues");
const saveScore = document.querySelector("#saveScore");
const clearScore = document.querySelector("#clearScore");
const curPlayerScore = document.querySelector("#finalScore #wrapper span");
const disScore = document.querySelector("#displayScore #wrapper div");
const disHighScores = document.querySelector("#viewHighScore");
const back = document.querySelector("#home");

//Questions
const questions = [
  {
    id: 1,
    question: "Commonly used data types do not include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: 2,
  },
  {
    id: 2,
    question: "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: 3,
  },
  {
    id: 3,
    question:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: 2,
  },
  {
    id: 4,
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: 3,
  },
  {
    id: 5,
    question:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: 0,
  },
];

//  Callback Functions

const displayNone = (id) => {
  document.querySelector(`#${id}`).style.display = "none";
};
const displayBlock = (id) => {
  document.querySelector(`#${id}`).style.display = "block";
};

const showQues = () => {
  displayNone("spinner");
  displayBlock("showQuiz");

  questions.forEach((e, id) => {
    if (id === qNo) {
      ques.textContent = `Q${e.id}` + ":" + " " + e.question;
      e.options.forEach((o, key) => {
        choices[key].textContent = o;
      });
    }
  });
};

const startQuiz = () => {
  displayNone("startQuiz");
  displayBlock("spinner");
  setTimeout(() => {
    showQues();
  }, 1000);
  const interVal = setInterval(() => {
    if (time <= 0 || qNo == questions.length) {
      setTimeout(() => {
        displayNone("showQuiz");
        displayBlock("finalScore");
        curPlayerScore.textContent = score;
        clearInterval(interVal);
      }, 700);
    }
    if (wrongAnswer) {
      time -= 10;
      wrongAnswer = false;
    }
    timer.textContent = time > 0 ? time : 0;
    time--;
  }, 1000);
};

const checkAnswer = (e) => {
  if (questions[qNo].answer === e) {
    choices[e].classList.toggle("animate-correct", true);
    qNo++;
    score += 10;
    setTimeout(() => {
      showQues();
    }, 700);
  } else {
    choices[e].classList.toggle("animate-wrong");
    wrongAnswer = true;
    if (score >= 5) score -= 5;
  }
  setTimeout(() => {
    choices[e].classList.toggle("animate-correct", false);
    choices[e].classList.toggle("animate-wrong", false);
  }, 500);
};

const nextQuestion = () => {
  qNo += 1;
  showQues();
};

const addScore = () => {
  const player = document.querySelector("#playerName").value;
  localStorage.setItem(player, score);
  displayNone("finalScore");
  showScores();
};

const showScores = () => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    const iscore = document.createElement("p");
    const text = document.createTextNode(key + ":" + " " + value);
    iscore.appendChild(text);
    disScore.appendChild(iscore);
  }
  displayBlock("displayScore");
};

const viewHighScore = () => {
  displayNone("startQuiz");
  displayBlock("displayScore");
};

const clearData = () => {
  localStorage.clear();
  disScore.remove();
};

const Home = () => {
  location.reload();
};

//EventListeners

startBtn.addEventListener("click", startQuiz);
skipQues.addEventListener("click", nextQuestion);
saveScore.addEventListener("click", addScore);
clearScore.addEventListener("click", clearData);
disHighScores.addEventListener("click", viewHighScore);
back.addEventListener("click", Home);
choices.forEach((e, key) => {
  e.addEventListener("click", () => {
    checkAnswer(key);
  });
});
