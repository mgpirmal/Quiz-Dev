const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const finalScore = document.getElementById('finalScore');
//get highscore or empty array
const highScores = JSON.parse(localStorage.getItem('highscores')) || [];
const timerResults = JSON.parse(localStorage.getItem('timerResults')) ||[];
const highScoresList = document.getElementById("highScoresList");


finalScore.innerText = mostRecentScore;


username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
console.log(username.value);

});




saveHighScore = e => {
    
    e.preventDefault();

    const score = {
        score:mostRecentScore,
        name:username.value,
        time: timerResults,
    };
    highScores.push(score);
    //if i want to sort by time, I can change it here
    highScores.sort((a,b) => b.score - a.score);
    
    highScores.splice(5);
    
    localStorage.setItem('highScores', JSON.stringify(highScores));


    highScoresList.innerHTML = highScores
    .map(score => {
      return `<li class="high-score">NAME:${score.name}--SCORE: ${score.score}--TIME:${score.time}</li>`;
    })
    .join("");


};



// function renderHighScore() {
    // // Clear todoList element and update todoCountSpan
    // todoList.innerHTML = "";
    // todoCountSpan.textContent = todos.length;
  
//     // Render a new li for each todo
//     for (var i = 0; i < 5; i++) {
//       var highScores = highScores[i];
  
//       var li = document.createElement("li");
//       li.textContent = highScores;
//       li.setAttribute("data-index", i);
  
     

//       highScores.appendChild(li);
//     };
//   };

// map lets you turn html into a string
// highScoresList.innerText = highScores.map(score => {
//     return '<li class="high-scores">${score.name}-${score.score}</li>'
    
//     });
//     .join