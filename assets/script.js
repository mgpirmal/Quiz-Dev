var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};

let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions=[];

let questions = [
  {
    question: "What does HTML stand for?",
    choice1: "Hypertext Markup Language",
    choice2: "Hypertext Machine Learning",
    choice3: "Heavy Markup Language",
    choice4: "Hypertext Markup Learning",
    answer: 1
  },
  {
  question: "What can you put in an Array?",
  choice1: "String",
  choice2: "Boolean",
  choice3: "Numbers",
  choice4: "All of the Above",
  answer: 4
  },
  {
    question: "Which command will allow you to take from a repository and add to your local computer",
    choice1: "git send",
    choice2: "git pull",
    choice3: "git add -A",
    choice4: "git push origin main",
    answer: 2
  },
  {
    question: "Which command will allow you to update your repositiory with commited files",
    choice1: "git send",
    choice2: "git pull",
    choice3: "git add -A",
    choice4: "git push origin main",
    answer: 4

  }
  
]
const questionAmount = 4;
const bonus = 1;

var timer;
var timerCount;
var timerResults;





// When the game starts, reset Timer and begin new random question


startGame =() => {
    questionCounter = 0;
    timerCount = 250
    availableQuestions=[...questions];
    console.log(availableQuestions);
    startButton.disabled = true;
    getNewQuestion();
   
    startTimer();
};
getNewQuestion = () => {
if(availableQuestions.length === 0){
//go to Hiscore page when all questions were used
//set timer and score value
localStorage.setItem("mostRecentScore", score);
localStorage.setItem("timerResults",timerResults)

return window.location.assign("\hiScore.html");
}
// adds up questions number and displays it
  questionCounter++;
  questionCounterText.innerText = "Question "+ questionCounter+ "/"+questionAmount;
//pulls random question
  const questionIndex = Math.floor(Math.random()*availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;
//pulls choices into buttons
  choices.forEach( choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });
  //erase question from array
  availableQuestions.splice(questionIndex,1);
  acceptingAnswers= true;
};
//e.target is event target!!
choices.forEach(choice =>{
    choice.addEventListener('click', e =>{
      if (!acceptingAnswers) return;

      acceptingAnswers=false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset['number'];
// apply btn-danger by default when pressed. If correct, btn.success.
      let classToApply = 'btn-danger';
      if (selectedAnswer == currentQuestion.answer) {
        classToApply = 'btn-success';
    
      };

      if (classToApply === 'btn-success'){
        incrementScore(bonus);
      }
//set a time to see color change for right and wrong answers
      selectedChoice.parentElement.classList.add(classToApply);
      setTimeout(()=>{
     
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
  
      },1000);
 
    });

});

incrementScore = num => {
  score += num;
  scoreText.innerText == score;
}
//startGame();

// function startGame() {
//    isWin = false;
//   timerCount = 100;
//   // Prevents start button from being clicked when round is in progress
//   startButton.disabled = true;
//   startTimer()
// }









// The setTimer function starts and stops the timer and triggers winQuiz() and noFinish()
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = timerCount;
      if (timerCount >= 0) {
        // Tests if win condition is met
        if (availableQuestions.length === 0 && timerCount > 0) {
          // Clears interval and stops timer
         timerResults= timerCount
          clearInterval(timer);
          
        }
      }
      // Tests if time has run out
      if (timerCount === 0) {
        // Clears interval
        clearInterval(timer);
        alert("You did not finish. Try Again!");
      }
    }, 100);
  }

  // function winQuiz() {
  //   wordBlank.textContent = "YOU WON!!!🏆 ";
  //   winCounter++
  //   startButton.disabled = false;
  //   win.textContent = winCounter;
  //   localStorage.setItem("winCount", winCounter);
    
  // }

  // function getResults() {
  //   // Get stored value from client storage, if it exists
  //   var storedWins = localStorage.getItem("winCount");
  //   // If stored value doesn't exist, set counter to 0
  //   if (storedWins === null) {
  //     winCounter = 0;
  //   } else {
  //     // If a value is retrieved from client storage set the winCounter to that value
  //     winCounter = storedWins;
  //   }
  //   //Render win count to page
  //   win.textContent = winCounter;
  // }

//   //This runs when Quiz is completed
//   function winQuiz(){
//     isWin = true;

//   }

//   // This runs if time runs out
//   function noFinish(){
// isWin = false;
//   }

//   // Attach event listener to start button to call startGame function on click
 startButton.addEventListener("click", startGame);
