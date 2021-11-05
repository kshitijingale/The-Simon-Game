var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

function nextSequence() {
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    level++;

    $("#level-title").text("Level " + level);
    
}
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    
    animatePress(userChosenColour);

    checkAnswer((userClickedPattern.length) - 1);
})

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColour){

    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100);

}

$(document).keydown(function() {
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){

        if(gamePattern.length == userClickedPattern.length){

            setTimeout(function(){
                nextSequence();
            },1000);

        }

    }
    else{
        var wrong = "wrong";

        playSound(wrong);

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver(){
    level = [];

    gamePattern = [];

    started = false;

}