/*
  Empty example
 */

var mic;
var amp;

var mapMax = 0.4;

var threshold = 0.4;
var cutoff = 0;
var addCuttoff = 0.6;
var decayRate = 0.95;

var r = 0;
var g = 0;
var b = 0;

var noiseScale=0.02;

var currNoise;
var loudestNoise;



function preload() {
  // add the path to your sound
  sound = loadSound('../../music/ganon-laugh.wav');
}

function setup() {


	var cnv = createCanvas(windowWidth, windowHeight);


	background(0);

	//get mic info
	mic = new p5.AudioIn();
	amp = new p5.Amplitude();

	mic.start();
	amp.setInput(mic);

	amp.smooth(0.95);

	//amp.setInput(sound);
	//sound.play();


	//get camera info
	capture = createCapture(VIDEO);
  capture.size(width, height);
  capture.hide();


  loudestNoise = 0;
}


function draw() {




	var v = amp.getLevel();
	v = map(v, 0, 0.5, height, 0);

	var vAbs = setSoundNum(v);


	//150 is pretty loud
	//336 is no noise (this is non abs)


	//camera capture
  if(vAbs < 200){
  	image(capture, 0, 0, width, height);
  }else{
  	for(i = 0; i<15; i++){
			image(capture, Math.random() * width, 50 ,Math.random() * width, Math.random() * height);
		}
  }

  if(v > 300){
  	filter(THRESHOLD,.9);
  }else if(v > 180){
  	filter(THRESHOLD, .3);
  }else{
  	filter(POSTERIZE, 5);
  }

	stroke(255);

	for(i=0; i < vAbs; i++){
		if(vAbs < 230){
			stroke(255);
			line(Math.random() * width, Math.random() * height, Math.random() * width, Math.random() * height);
		}
		else{
			stroke(Math.random() * 255, Math.random() * 100, Math.random() * 55);
			line(Math.random() * width, Math.random() * height, Math.random() * width, Math.random() * height);

			stroke(Math.random() * 50, 20, 20, 50);
			line(Math.random() * width/7, Math.random() * height/7, Math.random() * width/7, Math.random() * height/7);
		}

	}


  //possibly as they get louder the background gets less blurry and switches from gray to posterize?

  //show user in background looking all crazy


	//increase intensity of color background as noise increases


	//make dirt particles go into the air as sound increases


	//make dirt go into certain shapes and change colors at certain sound levels


	//extra credit (haha) - if the camera movies a lot make holes appear in the dirt!


	//text('level: ' + v, 20, 20);

	currNoise = vAbs;


	if(currNoise > loudestNoise){
		loudestNoise = currNoise;
		console.log(loudestNoise);
	}




	if(loudestNoise > 640){
		image(capture, 0, 0, width, height);
		sound.play();
	}


}

function setSoundNum(n){
	return (379 - n);
}