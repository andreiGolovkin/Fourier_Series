class Arrow {
  constructor() {
    this.next = null;
    
    this.length = 0;
    this.angle = 0;
    
    this.func = (a) => { return a; };
    
    this.rotation_speed = PI/360;
  }
  
  update() {
    this.angle += this.func(this.rotation_speed);
    
    if (this.next) this.next.update();
  }
  
  draw() {
    rotate(this.angle);
    stroke(255);
    line(0, 0, this.length, 0);
    translate(this.length, 0);
    
    if (this.next) this.next.draw();
  }
}

let img;

let arrow_head = null;
let prev_point = null;

function setup() {
  createCanvas(800, 700);
  
  img = createGraphics(800, 700);
  img.clear();
  
  let i = 5;
  let arrows_config = [
    { len: 14, vel: -PI/1440 * i, start: -PI / 2 }, // 1
    { len: 176, vel: PI/720 * i, start: 0 }, // 1
    { len: 40, vel: -PI/480 * i, start: PI }, // 3
    { len: 40, vel: PI/360 * i, start: 0 }, // 4
    { len: 10, vel: -PI/288 * i, start: PI }, // 5
    { len: 40, vel: PI/240 * i, start: PI }, // 6
    { len: 4, vel: -PI/(240 - (240 / 7)) * i, start: 0 }, // 7
  ];
  
  let current_arrow;
  for (let arrow_param of arrows_config) {
    if (arrow_head) {
      current_arrow.next = new Arrow();
      current_arrow = current_arrow.next;
    } else {
      arrow_head = new Arrow();
      current_arrow = arrow_head;
    }
    
    let { len, vel, start, func } = arrow_param;
    current_arrow.length = len;
    current_arrow.rotation_speed = vel;
    current_arrow.angle = start;
    if (func) current_arrow.func = func;
  }
}

function draw() {
  background(0);
  
  image(img, 0, 0);
  
  arrow_head.update();
  
  translate(width / 2, height / 2);
  
  arrow_head.draw();
  
  let tf = drawingContext.getTransform();
  //print(tf);
  resetMatrix();
  
  fill(255, 0, 0);
  ellipse(tf.e / 2, tf.f / 2, 5, 5);
  
  let current_point = createVector(tf.e / 2, tf.f / 2);
  if (prev_point) {
    img.stroke(0, 255, 0);
    let x1 = current_point.x;
    let y1 = current_point.y;
    let x2 = prev_point.x;
    let y2 = prev_point.y;
    
    img.line(x1, y1, x2, y2);
  }
  
  prev_point = current_point;
  
  frameRate(100);
}
