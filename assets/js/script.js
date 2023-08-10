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
var sfxRight = new Audio("assets/sfx/sectionfail.wav");
var sfxWrong = new Audio("assets/sfx/sectionpass.wav");
