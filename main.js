scoreLeft_wrist=0;
scoreright_wrist=0;
leftWristY=0;
leftWristX=0;
rightWristY=0;
rightWristX=0;
song="";
function preload()
{
song=loadSound("music.mp3");
}

function setup()
{
canvas=createCanvas(600, 500);
canvas.center();
video=createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotposes);
}

function modelLoaded()
{
    console.log("poseNet is intialized");
}

function gotposes(results)
{
if(results.length > 0)
{
    console.log(results);
    scoreright_wrist=results[0].pose.keypoints[10].score

    scoreLeft_wrist=results[0].pose.keypoints[9].score;
    console.log("scoreright_wrist = " + scoreright_wrist);

    console.log("scoreLeft_wrist = " + scoreLeft_wrist);
    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    console.log("leftWristX="+ leftWristX + " leftWristY=" + leftWristY);

    rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;
    console.log("rightWristX="+ rightWristX + " rightWristY=" + rightWristY);
}
}

function draw()
{
image(video, 0, 0, 600, 500);
fill("#006963");
stroke("#00fff0");

if(scoreright_wrist > 0.2)
{

circle(rightWristX, rightWristY, 20);


if(rightWristY > 0 && rightWristY <= 100){
    song.rate(0.5);
    document.getElementById("speed_of_song").innerHTML ="speed = 0.5x";
}

else if(rightWristY > 100 && rightWristY <= 200)
{
    song.rate(1);
    document.getElementById("speed_of_song").innerHTML ="speed = 1x";
}

else if(rightWristY > 200 && rightWristY <= 300)
{
    song.rate(1.5);
    document.getElementById("speed_of_song").innerHTML ="speed = 1.5x";
}

else if(rightWristY > 300 && rightWristY <= 400)
{
    song.rate(2);
    document.getElementById("speed_of_song").innerHTML ="speed = 2x";
}

else if(rightWristY > 400 && rightWristY <= 500)
{
    song.rate(2.5);
    document.getElementById("speed_of_song").innerHTML ="speed = 2.5x";
}

}

if(scoreLeft_wrist > 0.2);
{
circle(leftWristX, leftWristY, 20);
leftWristNo =Number(leftWristY);
removeDecimal= floor(leftWristNo);
volume=removeDecimal/500;
document.getElementById("volume_of_song").innerHTML="volume = " + volume;
song.setVolume(volume);
}

}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
    
}