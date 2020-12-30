
// sizing
var width = window.innerWidth;
var height = window.innerHeight;

// canvas
var canvas = document.querySelector(".canvas");
canvas.width = width;
canvas.height = height;

// context
var context = canvas.getContext("2d");

// start
var numStars = 0;
var stars = [];
var twinkleFactor = 0.3;
var maxStarRadius = 1;

var firework1;
var firework2;
var firework3;
var minStrength = 4; //lowest firework power
var maxStrength = 7; //highest firework power
var minTrails = 15; //min particles
var maxTrails = 30; //max particles
var particleRadius = 1;
var trailLength = 15; //particle trail length
var delay = 0.3; // number of lifetimes between explosions
var lifetime = 150; //life time of firework
var g = 5e-2; //strength of gravity
var D = 1e-3; //strength of drag (air resistance)

// Particle function
var Particle = function(x, y, vx, vy, ax, ay, colour) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.ax = ax;
  this.ay = ay;
  this.lifetime = lifetime;
  this.path = [];
  this.colour = colour;
  this.r = particleRadius;

  this.update = function() {
    this.lifetime--;

    // add point to path but if full, remove a point first
    if (this.path.length >= trailLength) this.path.shift();
    this.path.push([this.x, this.y]);

    // update speed n position n stuff
    this.vy += this.ay;
    this.vx += this.ax;
    this.x += this.vx;
    this.y += this.vy;
  };

  this.draw = function() {
    var opacity = ~~((this.lifetime * 100) / lifetime) / 100;

    // tail
    context.fillStyle = "rgba(" + this.colour + opacity * 0.6 + ")";
    
    if (this.lifetime > lifetime * 0.95) context.fillStyle = "#fff";
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(this.x - this.r, this.y);
    var i = this.path.length - 1;
    context.lineTo(this.path[0][0], this.path[0][1]);
    context.lineTo(this.x + this.r, this.y);
    context.closePath();
    context.fill();

    // main dot
    context.fillStyle = "rgba(" + this.colour + opacity + ")";
    if (this.lifetime > lifetime * 0.95) context.fillStyle = "#fff";
    context.beginPath();
    context.arc(~~this.x, ~~this.y, this.r, 0, Math.PI * 2);
    context.fill();
    context.closePath();
  };
};

// Firework function
var Firework = function() {
  this.x = width * (Math.random() * 0.8 + 0.1); // from 0.1-0.9 widths
  this.y = height * (Math.random() * 0.8 + 0.1); // from 0.1-0.9 heights
  this.strength =
    Math.random() * (maxStrength - minStrength) + minStrength;
  this.colour =
    ~~(Math.random() * 255) +
    "," +
    ~~(Math.random() * 255) +
    "," +
    ~~(Math.random() * 255) +
    ",";
  this.lifetime = 0;
  this.particles = (function(x, y, strength, colour) {
    var p = [];

    var n = ~~(Math.random() * (maxTrails - minTrails)) + minTrails;
    var ay = g;
    for (var i = n; i--; ) {
      var ax = D;
      var angle = (i * Math.PI * 2) / n;
      if (angle < Math.PI) ax *= -1;
      var vx = strength * Math.sin(angle);
      var vy = strength * Math.cos(angle);
      p.push(new Particle(x, y, vx, vy, ax, ay, colour));
    }

    return p;
  })(this.x, this.y, this.strength, this.colour);

  this.update = function() {
    this.lifetime++;
    if (this.lifetime < 0) return; //allows  to be delayed
    for (var i = this.particles.length; i--; ) {
      this.particles[i].update();
      this.particles[i].draw();
      // could also make an extra draw function for firework function
    }
  };
};

var Star = function() {
  this.x = Math.random() * width;
  this.y = Math.random() * height;
  this.r = Math.random() * maxStarRadius;
  this.b = ~~(Math.random() * 100) / 100;
};

Star.prototype.draw = function() {
  this.b += twinkleFactor * (Math.random() - 0.5);
  context.fillStyle = "rgba(255,255,255," + this.b + ")";
  context.beginPath();
  context.arc(~~this.x, ~~this.y, this.r, 0, Math.PI * 2);
  context.fill();
  context.closePath();
};

function createStars() {
  for (var i = numStars; i--; ) stars.push(new Star());
}

function main() {
  context.fillStyle = "#001438";
  context.fillRect(0, 0, width, height);

  for (var i = numStars; i--; ) stars[i].draw();

  firework1.update();
  firework2.update();
  firework3.update();

  if (firework1.lifetime == lifetime * delay || firework3.lifetime == lifetime * delay) firework2 = new Firework();
  if (firework2.lifetime == lifetime * delay || firework3.lifetime == lifetime * delay) firework1 = new Firework();
  if (firework1.lifetime == lifetime * delay || firework2.lifetime == lifetime * delay) firework3 = new Firework();

  window.requestAnimationFrame(main);
}

function init() {
  firework1 = new Firework();
  firework2 = new Firework();
  firework3 = new Firework();
  firework3.lifetime = -lifetime * delay;
  createStars();
  main();
}

init();