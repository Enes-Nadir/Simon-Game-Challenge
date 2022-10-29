
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;



$(document).keypress(function(){
  if (!started){

    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
 var userChosenColour = $(this).attr("id");
 userClickedPattern.push(userChosenColour);
 var indexoflast = userChosenColour.length;
 console.log(indexoflast);
 playSound(userChosenColour);

 animatePress(userChosenColour);

 checkAnswer(userClickedPattern.length-1);
});



function checkAnswer(currentlevel){

 if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {
   console.log("Sucess");

  if (userClickedPattern.length === gamePattern.length){

    setTimeout(function(){
      nextSequence();
    }, 1000);
  }
}else {
   console.log("Wrong!");
   playSound("wrong")
   var gameOver = $("body");
   gameOver.addClass("game-over");
   setTimeout(function () {
     gameOver.removeClass("game-over");
   }, 200);
   $("#level-title").text("Game Over, Press Any Key to Restart");

   startOver()

}
}

function nextSequence(){

userClickedPattern = [];

  level++;

  $("#level-title").text("level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
 }

//Start over

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

//Play Sound

function playSound(name){
  var audio = new Audio ("sounds/" + name + ".mp3");
  audio.play();
}

//Animation
function animatePress(currentColour){
$(".btn").click(function(){
  var currentColour = $(this);
  currentColour.addClass("pressed");
  setTimeout(function(){
    currentColour.removeClass("pressed");
  }, 100);
});}
