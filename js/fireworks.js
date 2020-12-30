var fireworks = [];
 var gravity;

 function Firework() { //Основная функция
  this.intensity = random (255);
  this.firework = new Fireball(random(width), height, this.intensity, true);
  this.exploded = false;
  this.fireballs = [];
 
  this.done = function() {
   if (this.exploded && this.fireballs.length === 0) return true;
   else return false;
  }

  this.getCongratulationDate = function () { //Сегодняшняя дата как р а з р е ж е н н ы й текст
   var monthes=new Array (' я н в а р я',' ф е в р а л я',' м а р т а',' а п р е л я',' м а я',' и ю н я',
    ' и ю л я',' а в г у с т а',' с е н т я б р я',' о к т я б р я',' н о я б р я',' д е к а б р я');
   var date = new Date();
   var day=date.getDate();
   var month=date.getMonth();
   return 'С  ' + (day>9 ? floor(day/10) : '') + ' ' + (day%10) + '  ' + monthes[month] + ' !';
  }

  this.putText = function () { //Вывод текста
   var s = this.getCongratulationDate();
   textSize (64); textStyle(ITALIC); //textAlign (CENTER); 
   var color = this.intensity;
   noFill();
   stroke (color,255,255);
   strokeWeight (1);
   text (s, 8, 64);
  }
  
  this.update = function() { 
   if (random(1)<0.01) this.putText();

   if (!this.exploded) {
    this.firework.applyForce(gravity);
    this.firework.update();
    if (this.firework.vel.y >= 0) {
     this.exploded = true;
     this.explode();
    }
   }
   for (var i = this.fireballs.length-1; i >= 0; i--) {
    this.fireballs[i].applyForce(gravity);
    this.fireballs[i].update();
    if (this.fireballs[i].done()) {
     this.fireballs.splice(i, 1);
    }
   }
  }
  
  this.explode = function() {
   var n = 100 + random(200); //количество разлетающихся огоньков
   for (var i = 0; i < n; i++) { 
    var p = new Fireball(this.firework.pos.x, this.firework.pos.y, this.intensity, false);
    this.fireballs.push (p);
   }     
  }

  this.show = function() {
   if (!this.exploded) {
    this.firework.show();
   }
   for (var i = this.fireballs.length-1; i >= 0; i--) {
    this.fireballs[i].show();
   }
  }
 }

 function setup() {
  createCanvas(windowWidth, windowHeight);
  gravity = createVector (0, 0.1);
  colorMode (HSB);
  stroke (255);
  strokeWeight (4);
  background (0);
 }

 function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
 }

 function draw() {
  colorMode(RGB);
  background(0, 0, 0, 25);
  if (random(1) < 0.09) { 
   //частота появления нового объекта, чем меньше число, тем реже
   fireworks.push(new Firework());
  }
  for (var i = fireworks.length-1; i >= 0; i--) {
   fireworks[i].update();
   fireworks[i].show();
   if (fireworks[i].done()) fireworks.splice(i, 1);
  }
 }

 function Fireball (x, y, intensity, firework) { //Один взрыв
  this.pos = createVector (x, y);
  this.firework = firework;
  this.lifespan = 100 + random(-50,200); //Время жизни объекта
  this.intensity = intensity;

  if (this.firework) {
   this.vel = createVector (0, random(-12, -8));
  }
  else {
   this.vel = p5.Vector.random2D();
   this.vel.mult(random(5, 20));
  }
  this.acc = createVector(0, 0);

  this.applyForce = function(force) {
   this.acc.add(force);
  }

  this.update = function() {
   if (!this.firework) {
    this.vel.mult (0.95+random(-0.05,0.04));
    this.lifespan -= 4;
   }
   this.vel.add (this.acc);
   this.pos.add (this.vel);
   this.acc.mult (0);
  }

  this.done = function() {
   if (this.lifespan < 0) return true;
   else return false;
  }

  this.show = function() {
   colorMode(HSB);
   if (!this.firework) {
    strokeWeight (2);
    stroke (intensity, 255, 255, this.lifespan);
   }
   else {
    strokeWeight (4);
    stroke (intensity, intensity, intensity);
   }
   point (this.pos.x, this.pos.y);
  }
 }

 onload = Firework(); //Запустить по загрузке окна