"use strict";

// document.querySelector(".message").textContent = "Correct Number! 🎆";

// document.querySelector(".number").textContent = 13;
// document.querySelector(".score").textContent = 10;

// document.querySelector(".guess").value = 13;

function rand() {
  return Math.trunc(Math.random() * 20) + 1;
}
let secretNumber = rand()
let score = 20;
let highScore = 0;

var checkButton = document.querySelector(".check");
checkButton.addEventListener("click", () => {
  const guess = parseInt(document.querySelector(".guess").value);
  //   console.log(typeof guess);

  if (!guess) {
    document.querySelector(".message").textContent = "No number";
  } else if (guess == secretNumber) {
    document.querySelector(".message").textContent = "Correct Number";
    document.querySelector(".number").textContent = secretNumber;

    document.querySelector('body').style.backgroundColor = '#60b347'
    document.querySelector('.number').style.width = '30rem'
    if (score > highScore) {
      highScore = score
      document.querySelector(".highscore").textContent = highScore;
    }
  }
  else if(guess !== secretNumber){
    if (score > 1) {
      document.querySelector(".message").textContent = guess > secretNumber ? "Too high!" : "Too Low!";
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      document.querySelector(".message").textContent = "You Lost The Game";
      document.querySelector(".score").textContent = 0;
    }
  }
  
  
  
  // else if (guess > secretNumber) {
  //   if (score > 1) {
  //     document.querySelector(".message").textContent = "Too high!";
  //     score--;
  //     document.querySelector(".score").textContent = score;
  //   } else {
  //     document.querySelector(".message").textContent = "You Lost The Game";
  //     document.querySelector(".score").textContent = 0;
  //   }
  // } else if (guess < secretNumber) {
  //   if (score > 1) {
  //     document.querySelector(".message").textContent = "Too Low!";
  //     score--;
  //     document.querySelector(".score").textContent = score;
  //   } else {
  //     document.querySelector(".message").textContent = "You Lost The Game";
  //     document.querySelector(".score").textContent = 0;
  //   }
  // }
});

const resetButton = document.querySelector('.again');
resetButton.addEventListener('click',()=>{
  secretNumber = rand()
 // document.querySelector(".number").textContent = secretNumber
  score = 20
  document.querySelector('.number').style.width = '15rem'
  document.querySelector(".score").textContent = score;
  document.querySelector(".message").textContent = "Start guessing...";
  document.querySelector('.guess').value = ''
  document.querySelector('body').style.backgroundColor = '#222'
 
    document.querySelector(".number").textContent = '?';
  
})

