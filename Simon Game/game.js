
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
  });

$(".btn").click(function(){
    var userChoseColour = $(this).attr("id");
    userClickedPattern.push(userChoseColour);
    playSound(userChoseColour);
    animatePress(userChoseColour);
    var lastIndex = userClickedPattern.length - 1;
    checkAnswer(lastIndex);
    

});



function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

function playSound(name){
    var myAudio = new Audio("sounds/"+name+".mp3");
    myAudio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function(){
                nextSequence();
            },1000);
            
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }
   
    
}
function startOver(){
    level = 0;
    gamePattern = [];
    started =false;
}