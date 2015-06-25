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



function preload() {
  // add the path to your sound
  //sound = loadSound('../../music/Broke_For_Free_-_01_-_As_Colorful_As_Ever.mp3');
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


}


function draw() {




	var v = amp.getLevel();
	v = map(v, 0, 0.5, height, 0);

	var vAbs = setSoundNum(v);

	//150 is pretty loud
	//336 is no noise


	//camera capture
  if(v>300){
  	image(capture, 0, 0, width, height);
  }else{
  	for(i = 0; i<15; i++){
			image(capture, Math.random() * width, 50 ,Math.random() * width, Math.random() * height);
		}
  }

  if(v > 330){
  	filter(THRESHOLD,.9);
  }else if(v > 250){
  	filter(THRESHOLD, .3);
  }else{
  	filter(POSTERIZE, 5);
  }

	stroke(255);

	for(i=0; i < vAbs; i++){
		if(vAbs < 100){
			stroke(255);
			line(Math.random() * width, Math.random() * height, Math.random() * width, Math.random() * height);
		}
		else{
			stroke(Math.random() * 255, Math.random() * 100, Math.random() * 55);
			line(Math.random() * width, Math.random() * height, Math.random() * width, Math.random() * height);
		}
	}


  //possibly as they get louder the background gets less blurry and switches from gray to posterize?

  //show user in background looking all crazy


	//increase intensity of color background as noise increases


	//make dirt particles go into the air as sound increases
a


	//make dirt go into certain shapes and change colors at certain sound levels


	//extra credit (haha) - if the camera movies a lot make holes appear in the dirt!





	//text('level: ' + v, 20, 20);


}

function setSoundNum(n){
	return (336 - n);
}