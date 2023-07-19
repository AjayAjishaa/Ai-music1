Java = "";
Randall = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
song_Java = "";


function preload()
{
    Java = loadSound("Java.mp3");
    Randall = loadSound("Randall.mp3");
}
function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreLeftWrist);
        
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}
function modelLoaded()
{
    console.log('Posenet is Initialized');
}
function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#0c79f5");
    stroke("#0c79f5");

    song_Java = Java.isPlaying();
    console.log(song_Java);

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        Randall.stop();
        if(song_Java == false)
        {
            Java.play();
        }
        else
        {
            document.getElementById("song").innerHTML = "Song Name: Java such a whole";
        }
    }
}


