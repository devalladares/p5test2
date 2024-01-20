let c1;
let refresh;
let c = [];
let ringNumber = 10;
const emptySpace = 10;
const gap = 10;
const emptySpace2 = 2;
let circles = [];
let lowercircles = [];
let circleNumber;
let xSpeed = 5;

let deader = -60;
let deader2;
let scaler = 0.9;

let outerRadius = ringNumber * gap + emptySpace2;
let yHeight = outerRadius;

function setup() {
  createCanvas(600,560);

  runSketch();

  randomboi = createButton("Randomise");
  randomboi.mousePressed(runSketch);
  randomboi.size(width, 40);

}

function runSketch() {
  for (let i = 0; i < ringNumber; i++) {
    c[i] = new circleRing(i * gap + emptySpace, ringNumber * gap + emptySpace);
  }
}

function draw() {
  background(0);
  // print(frameRate())

  push();
  translate(width / 2, height / 2);
  scale(1.3)

  // circleUp()

  for (let i = 1; i < c.length; i++) {
    c[i].update();
  }

  pop();

  // if (frameCount % 100 === 0) {
  //   runSketch()
  // }
}

class circleRing {
  constructor(radius, bigRadius) {
    //general
    this.random = random(0, 13);

    //cirler
    this.bigRadius = bigRadius;
    this.rotate = random(0.0005, 0.0001);
    // this.rotate = 0.00025
    this.r = random(1, 20);
    this.r2 = random(1, 20);
    this.num = round(random(10, 50));
    this.radius = radius;
    this.stroke = random(0, 255);
    this.fill = random(0, 255);
    this.alpha = random(0, 100);
    this.angle = TAU / this.num;

    //liner
    this.lineNum = random(1, 10);
    this.lineStroke = random(0.1, 2);

    //radianter
    this.radNum = random(10, this.radius);
    this.radAngle = TAU / this.radNum;
    this.lineLength = random(5, 50);
    this.radius1 = this.radius + this.lineLength / 5;
    this.radius2 = this.radius - this.lineLength / 5;

    //petaler
    this.petNum = round(random(10, 50));
    // this.petNum = round(random(1,10))
    this.petSize = random(2, 20);
    this.petAngle = TAU / this.petNum;
    this.petRadius = random(5, 20);
    this.petStroke = this.petRadius / 2;

    //squarer
    this.squareNum = round(random(5, 40));
    this.squareSize = random(1, 10);
    this.squareAngle = TAU / this.squareNum;
    this.squareRand = round(random(0, 2));
  }

  style() {
    // stroke(this.stroke)
    // fill(this.fill)
    noStroke();
    fill(255);
    // stroke(0)
    // noFill()
  }

  update(pos) {
    this.style();

    if (this.random < 2) {
      this.circler();
    } else if (this.random > 2 && this.random < 6) {
      this.liner();
    } else if (this.random > 6 && this.random < 10) {
      this.radianter();
    } else if (this.random > 10 && this.random < 11) {
      // this.petaler()
    } else if (this.random > 11 && this.random < 13) {
      this.squarer();
    }

    // this.squarer()
    this.outliner();
  }

  //cirler////cirler////cirler////cirler////cirler////cirler//
  circler() {
    rotate(frameCount * this.rotate);

    noStroke();
    fill(255);

    for (let i = 0; i < this.num; i++) {
      this.x = sin(i * this.angle) * this.radius;
      this.y = cos(i * this.angle) * this.radius;

      ellipse(this.x, this.y, this.r);
    }
  }

  //liner////liner////liner////liner////liner////liner//
  liner() {
    stroke(255);
    noFill();
    strokeWeight(this.lineStroke);

    for (let i = 0; i < this.lineNum; i++) {
      // let y = abs(sin(i * 0.02 - frameCount * 0.005) * 255)
      // stroke(y)

      // circle(0, 0, (this.radius * 2) - (i * this.lineNum / 2) + (i * this.lineNum))
      circle(
        0,
        0,
        this.radius * 2 - (i * this.lineNum) / 2 + (i * this.lineNum) / 2
      );
      // circle(0, 0, (this.radius * 2) + (i * this.lineNum))
    }
  }

  //radianter////radianter////radianter////radianter////radianter////radianter//
  radianter() {
    rotate(frameCount * this.rotate);
    stroke(255);
    strokeWeight(this.lineStroke);

    for (let i = 0; i < 50; i++) {
      this.x1 = cos(i * this.angle) * this.radius1;
      this.y1 = sin(i * this.angle) * this.radius1;
      this.x2 = cos(i * this.angle) * this.radius2;
      this.y2 = sin(i * this.angle) * this.radius2;

      line(this.x1, this.y1, this.x2, this.y2);
    }
  }

  //squarer////squarer////squarer////squarer////squarer////squarer//
  squarer() {
    this.numm = 30;

    fill(255);
    noStroke();
    rectMode(CENTER);

    for (let i = 0; i < this.squareNum; i++) {
      push();
      translate(this.radius, 0);
      if (this.squareRand < 1) {
        rotate(radians(45));
      }

      rect(0, 0, this.squareSize, this.squareSize);

      pop();
      rotate(this.squareAngle);
    }
  }

  //petaler////petaler////petaler////petaler////petaler////petaler//
  petaler() {
    fill(255);
    noStroke();

    for (let i = 0; i < this.petNum; i++) {
      let x = sin(this.petAngle * i) * this.radius;
      let y = cos(this.petAngle * i) * this.radius;

      ellipse(x, y, this.petRadius);
    }

    stroke(255);
    noFill();
    strokeWeight(this.petStroke);
    ellipse(0, 0, this.radius * 2 - this.petRadius);
  }

  outliner() {
    strokeWeight(this.lineStroke + 1);
    // strokeWeight(5)
    noFill();
    stroke("white");
    circle(0, 0, this.bigRadius * 2);
    // circle(0, 0, 1)
    // line()
  }
}
