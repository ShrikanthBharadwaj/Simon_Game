var buttoncolors = ["red","blue","green","yellow"];

var gamepattern = [];
var userclickedpattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
 if(!started){
    $("#level-title").text("level "+level);
    nextsequence();
    started=true;
 }
});

$(".btn").click(function(){ 
    var userchosencolor = $(this).attr("id");
    userclickedpattern.push(userchosencolor);

    playsound(userchosencolor);
    animatepress(userchosencolor);

    checkanswer(userclickedpattern.length-1);
});

function checkanswer(currentlevel){
     if(gamepattern[currentlevel]===userclickedpattern[currentlevel]){
        if(userclickedpattern.length===gamepattern.length){
            setTimeout(function(){
                nextsequence();
            },1000);
        }
     }
     else{
        console.log("wrong");
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Press Any key to restart");
        startover();
     }
}

function nextsequence(){
    userclickedpattern =[];
    level++;
    $("#level-title").text("level "+level);
    var randomnumber = Math.floor(Math.random()*4);
    var randomchosencolor = buttoncolors[randomnumber]; 
    gamepattern.push(randomchosencolor);
    $("#" + randomchosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomchosencolor);
}

function animatepress(currentcolor){
    $("#" + currentcolor).addClass("pressed");
    setTimeout(function (){
        $("#" + currentcolor).removeClass("pressed");
    },100);
}

function playsound(name){ 
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}


function startover(){
   level=0;
   gamepattern=[];
   started=false;
}

