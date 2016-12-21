var txt=document.getElementById("txt");
var hi=document.getElementById("high");
var win=document.getElementById("win");

var s;
var scl = 20;
var food;
var sth;
var levels=document.getElementById('level');
levels.src="badge_1.png"
var through=1;

$("#level").on('click',function(){
	if (levels.src.slice(-11)==="badge_1.png"){
		levels.src="badge_2.png"
		frameRate(20);
		through=0;
	}else if(levels.src.slice(-11)==="badge_2.png"){
		levels.src="badge_3.png"
		frameRate(30);
		through=0;
	}else if(levels.src.slice(-11)==="badge_3.png"){
		levels.src="badge_1.png"
		frameRate(10);
		through=1;
	}
});

hi.textContent="High Score: " + window.localStorage.hscore;


function setup() {
	//var lvl=levels.src[levels.src.length-5]
  createCanvas(1360,340);
  $("body").append("<hr>")
  s = new Snake();
  frameRate(10);
  pickLocation();

}

function pickLocation() {
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

// function mousePressed() {
//   s.total++;
// }

function draw() {
  background(0, 0, 0,100); 

  if (s.eat(food)) {
    pickLocation();
  }
  s.death();
  s.update();
  s.show();


  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);
}

function score(high){
	sth=high;
	txt.textContent="Score: " + high;
}


// p5
function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }
}



function highscore(){
	if (sth>window.localStorage.hscore){
		window.localStorage.hscore=sth;
		win.play();
		hi.textContent="High Score: " + window.localStorage.hscore;
	}
}
//jquery-touchSwipe
$('body').swipe( {
  swipeUp:function(event, direction, distance, duration) {
  	s.dir(0, -1);
  },
  swipeDown:function(event, direction, distance, duration) {
  	s.dir(0, 1);
  },
  swipeRight:function(event, direction, distance, duration) {
  	s.dir(1, 0);
  },
  swipeLeft:function(event, direction, distance, duration) {
  	s.dir(-1, 0);
  },
  click:function(event, target) { 
  },
  threshold:100,
  allowPageScroll:"vertical"
});