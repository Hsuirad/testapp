var canvas = document.querySelector('canvas');
var firstslider = document.getElementById("firstslider");
var secondslider = document.getElementById("secondslider");

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 70;

var c = canvas.getContext('2d');

var gradient = c.createLinearGradient(0, 0, canvas.width, 0);
gradient.addColorStop("0", "magenta");
gradient.addColorStop("0.5", "blue");
gradient.addColorStop("1", "orange");

function Ball(x, y, velocity, radius, marker, acceleration){
	this.x = x;
	this.y = y;
	this.marker = marker;
	this.acceleration = acceleration;
	this.radius = radius;
	var gravity = .1;
	var stope = false;
	this.velocity = 0;
	var color = ['red', 'orange', 'white'];
	var chooser = Math.floor(Math.random() * 3);

	this.update = function(){
		if(stope != true){
			this.velocity += this.acceleration / 3;
		}

		if(this.marker == 2){
			this.y -= this.velocity;
		}
		else if(this.marker == 3){
			this.y += this.velocity;
		}
		if(this.y > innerHeight - this.radius - 70){
			this.velocity = 0;
			stope = true;
		}
		if(this.y < 259){
			this.velocity = 0;
			stope = true;
		}		

		this.draw();
	}

	this.draw = function(){
		if(this.marker == 3){
			c.font = "20px Georgia";
			c.fillStyle = gradient;
			c.fillText("Acceleration: ", 10, 20);
			c.fillText((this.acceleration.toFixed(3) + " m/s2"), 10, 50);
		}
		c.beginPath();
		if(this.marker == 2){
			c.moveTo((canvas.width/2 - 60), 70);
			c.lineTo((canvas.width/2 - 60), this.y);
			c.strokeStyle = color[chooser];
			c.stroke();
			c.beginPath();
		}
		if(this.marker == 3){
			c.moveTo((canvas.width/2 + 60), 70);
			c.lineTo((canvas.width/2 + 60), this.y);
			c.stroke();
			c.beginPath();
		}
		c.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
		c.strokeStyle = color[chooser];
		c.stroke();
		c.fillStyle = color[chooser];
		c.fill();
		if(this.marker == 2 || this.marker == 3){
			c.font = String(this.radius / 1.8) + "px Arial";
			c.fillStyle = "black";
			c.fillText((this.radius / 10).toFixed(1) + " kg", this.x - (this.radius / 1.4), 
				this.y + (this.radius / 6));
		}
	}
}

function init(){
	var x = (canvas.width/2);
	var y = 70;
	var firstslider = document.getElementById("firstslider").value;
	var secondslider = document.getElementById("secondslider").value;
	var velocity = 0;

	var r2 = firstslider * 10;
	var x2 = x - 60;
	var y2 = 370;
	var velocity2 = 0;

	var r3 = secondslider * 10;
	var x3 = x + 60;
	var y3 = 370;
	var velocity3 = 0;
	
	var acceleration = (r3 - r2) / (r2 + r3);
	var dall = new Ball(x, y, velocity, 60, 1);
	var call = new Ball(x2, y2, velocity2, r2 / 2, 2, acceleration);
	var mall = new Ball(x3, y3, velocity3, r3 / 2, 3, acceleration);

	function animate(){
		requestAnimationFrame(animate);
		c.clearRect(0, 0, innerWidth, innerHeight);

		dall.update();
		call.update();
		mall.update();
	}

	animate();
}
