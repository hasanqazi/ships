let spaceships = [];
var fuel = [];
var mines = [];

var startFuel = 40;
var startAsteroids = 20;
var startShips = 50;

var fuelChance = 0.1;
var asteroidChance = 0.01;
var shipChance = 0;
var mutationRate = 0.01;

var debug = false;

function preload() {
  healthPlus = loadImage('assets/icon_plusSmall.png');
  asteroid = loadImage('assets/meteor_detailedSmall.png');
  ship = loadImage('assets/ship_G.png');
}

function setup() {

  createCanvas(windowWidth, windowHeight);

  var gui = createGui('Simulation parameters').setPosition(width - 220, 20);;
  sliderRange(0, 1, 0.1);
  gui.addGlobals('fuelChance');
  sliderRange(0, 0.5, 0.01);
  gui.addGlobals('asteroidChance');
  sliderRange(0, 0.1, 0.01);
  gui.addGlobals('mutationRate');
  sliderRange(0, 1, 0.1);
  gui.addGlobals('shipChance');
  gui.addGlobals('debug');

  if (windowWidth < 500) {
    startFuel = 5;
    startAsteroids = 3;
    startShips = 4;
    for (var i = 0; i < startShips; i++) {
      var x = random(width);
      var y = random(height);
      spaceships[i] = new Spaceship(x, y);
    }
  
    for (var i = 0; i < startFuel; i++) {
      var x = random(width);
      var y = random(height);
      fuel.push(createVector(x,y));
    }
  
    for (var i = 0; i < startAsteroids; i++) {
      var x = random(width);
      var y = random(height);
      mines.push(createVector(x,y));
    }
  } else if (windowWidth < 1000) {
    startFuel = 20;
    startAsteroids = 10;
    startShips = 20;
    for (var i = 0; i < startShips; i++) {
      var x = random(width);
      var y = random(height);
      spaceships[i] = new Spaceship(x, y);
    }
  
    for (var i = 0; i < startFuel; i++) {
      var x = random(width);
      var y = random(height);
      fuel.push(createVector(x,y));
    }
  
    for (var i = 0; i < startAsteroids; i++) {
      var x = random(width);
      var y = random(height);
      mines.push(createVector(x,y));
    }
  } else {
    startFuel = 200;
    startAsteroids = 100;
    startShips = 100;

    for (var i = 0; i < startShips; i++) {
      var x = random(width);
      var y = random(height);
      spaceships[i] = new Spaceship(x, y);
    }
  
    for (var i = 0; i < startFuel; i++) {
      var x = random(width);
      var y = random(height);
      fuel.push(createVector(x,y));
    }
  
    for (var i = 0; i < startAsteroids; i++) {
      var x = random(width);
      var y = random(height);
      mines.push(createVector(x,y));
    }
  }
  
}

`function mouseDragged() {
  spaceships.push(new Spaceship(mouseX, mouseY));
}`

function draw() {
  background(35);

  if (random(1) < fuelChance) {
    var x = random(width);
    var y = random(height);
    fuel.push(createVector(x,y));
  }

  if (random(1) < asteroidChance) {
    var x = random(width);
    var y = random(height);
    mines.push(createVector(x,y));
  }

  if (random(1) < shipChance) {
    var x = random(width);
    var y = random(height);
    spaceships.push(new Spaceship(x, y));
  }

  for (var i = 0; i < fuel.length; i++) {
    `fill(0, 255, 0);
    ellipse(fuel[i].x, fuel[i].y, 8, 8);`
    image(healthPlus, fuel[i].x-16, fuel[i].y-16, 32, 32);
  }

  for (var i = 0; i < mines.length; i++) {
    `fill(255, 0, 0);
    ellipse(mines[i].x, mines[i].y, 8, 8);`
    image(asteroid, mines[i].x-16, mines[i].y-16, 32, 32);
  }

  // Call the appropriate steering behaviors for our agents
  for (var i = spaceships.length-1; i >= 0; i--) {
    spaceships[i].boundaries();
    spaceships[i].behaviors(fuel, mines);
    spaceships[i].update();
    spaceships[i].display();

    var newSpaceShip = spaceships[i].reproduce();
    if (newSpaceShip != null) {
      spaceships.push(newSpaceShip);
    }

    if (spaceships[i].dead()) {
      var x = spaceships[i].position.x;
      var y = spaceships[i].position.y;
      fuel.push(createVector(x, y));
      spaceships.splice(i, 1);
    }
  }
}