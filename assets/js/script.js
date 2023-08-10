// variables to reference DOM elements
var startBtn = document.getElementById("start");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var questionsEl = document.getElementById("questions");
var submitBtn = document.getElementById("submit");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

// var quiz state variables
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// sfx sounds
var sfxRight = new Audio("assets/sfx/sectionpass.wav");
var sfxWrong = new Audio("assets/sfx/sectionfail.wav");

// start quiz function
function quizStart() {
  var startScreenEl = document.getElementById("start-screen");
  // hide screen
  startScreenEl.setAttribute("class", "hide");
  // unhide questions
  questionsEl.removeAttribute("class");
  // start timer
  timerId = setInterval(clockTick, 1000);
  // show starting time
  timerEl.textContent = time;

  getQuestion();
}

// function to get qustions
function getQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
// this will change the title of the question
  const titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  choicesEl.innerHTML = "";

  currentQuestion.choices.forEach((choice, index) => {
    const choiceNode = document.createElement("button");
    choiceNode.classList.add("choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = `${index + 1}. ${choice}`;

    choicesEl.appendChild(choiceNode);
  });
}

function questionClick(event) {
  var buttonEl = event.target;
  // if the clicked element is not a choice button, do nothing.
  if (!buttonEl.matches(".choice")) {
    return;
  }
  // check if user guessed wrong
  if (buttonEl.value !== questions[currentQuestionIndex].answer) {
    // penalize time
    time -= 15;
    if (time < 0) {
      time = 0;
    }
    // display new time on page
    timerEl.textContent = time;
    // play "wrong" sound effect
    sfxWrong.play();
    feedbackEl.textContent = "Wrong!";
  } else {
    // play "right" sound effect
    sfxRight.play();
    feedbackEl.textContent = "Correct!";
  }

  // flash right/wrong feedback on page for half a second
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);
  // move to next question
  currentQuestionIndex++;
  // check if we've run out of questions
  if (time <= 0 || currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // stop timer
  clearInterval(timerId);
  // show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");
  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;
  // hide questions section
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  // update time
  time--;
  timerEl.textContent = time;
  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  const initials = initialsEl.value.trim();
// this will check if initials are entered
  if (initials !== "") {
    const highscores = JSON.parse(localStorage.getItem("scores")) || [];
// create new score object
    const newScore = {
      score: time,
      initials: initials,
    };

    highscores.push(newScore);
// add to localstorage
    localStorage.setItem("scores", JSON.stringify(highscores));

    window.location.href = "scores.html";
  }
}

// this function checks for enter key when user is entering initials
function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// clicks for buttons
submitBtn.onclick = saveHighscore;
startBtn.onclick = quizStart;
choicesEl.onclick = questionClick;
initialsEl.onkeyup = checkForEnter;
