let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let level = 0;

let started = false;

$(document).keypress(function () {
  if (!started) {
    $("h1").text("level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  let randomNumber;

  randomNumber = Math.floor(Math.random() * 4);

  let randomChosenColour = buttonColours[randomNumber];

  console.log(randomChosenColour);

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
  animatePress(randomChosenColour);
  level++;
  $("h1").text("level " + level);
}

$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");

  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    let audio = new Audio("sounds/wrong.mp3");

    audio.play();

  $("body").addClass("game-over");
  setTimeout(function(){
  $("body").removeClass("game-over");

    
  },200);

  $("h1").text("Game Over, Press Any Key to Restart");
  $(document).keypress(function () {
    buttonColours = ["red", "blue", "green", "yellow"];

    gamePattern = [];

    userClickedPattern = [];

    level = 0;

    started = false;
  });
}
}

