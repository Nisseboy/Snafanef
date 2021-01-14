let w;
let h;
let speed = 5;

let e_x_t_e_n_d_o_h = false;

let size = 30;
let spacing = 2;
let foodColor = [255, 0, 0];
let backgroundColor = [0, 0, 0];
let emptyColor = [25, 25, 25];
let snakeColor = [220, 220, 220];
let rat;

let pos = [];
let vel = [1,0];
let active = false;
let foodPos = [];

this.focus();

function setup() {
  rat = size + spacing;
  w = floor(windowWidth / rat / 2) * 2
  h = floor(windowHeight / rat / 2) * 2
  createCanvas(w * rat, h * rat);
  
  start();
}

function draw() {
  if (frameCount % (60 / speed) == 0) {
    doOtherShit();
    drawShit();
  }

}

function start() {
  pos = [];
  vel = [1,0];
  pos.push([w / 2, h / 2]);
  pos.push([w / 2 - 1, h / 2]);
  pos.push([w / 2 - 2, h / 2]);
  setFoodPos();
  active = false;
}
function doOtherShit() {
  
    if (active) {
      if (e_x_t_e_n_d_o_h)
        pos.push([]);
      e_x_t_e_n_d_o_h = false;
      for (let i = pos.length - 1; i > 0; i--) {
        pos[i][0] = pos[i - 1][0];
        pos[i][1] = pos[i - 1][1];
      }
      pos[0][0] += vel[0];
      pos[0][1] += vel[1];
    }
    if (isIn(pos[0][0], pos[0][1], "Food")) {
      setFoodPos();
      e_x_t_e_n_d_o_h = true;
    }
    if (isIn(pos[0][0], pos[0][1], "Snake")) {
      start();
    }
    if (pos[0][0] < 0 || pos[0][1] < 0 || pos[0][0] >= w || pos[0][1] >= h) {
      start();
    }
}

function drawShit() {
    background(backgroundColor);

    fill(emptyColor);
    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y++) {
        rect(x * rat, y * rat, size, size);
      }
    }

    fill(snakeColor);
    for (let i = 0; i < pos.length; i++) {
      rect(pos[i][0] * rat, pos[i][1] * rat, size, size);
    }

    fill(foodColor);
    rect(foodPos[0] * rat, foodPos[1] * rat, size, size);
}

function isIn(x, y, thing) {
  switch (thing) {
    case "Food":
      if (x == foodPos[0] && y == foodPos[1])
        return true;
      break;
    case "Snake":
      for (let i = 1; i < pos.length; i++) {
        if (x == pos[i][0] && y == pos[i][1])
          return true;
      }
      break;
  }
  return false;
}

function keyPressed() {
  active = true;
  switch (keyCode) {
    case 37: //Left
      if (vel[0] != 1)
        vel = [-1, 0];
      break;

    case 39: //Right
      if (vel[0] != -1)
        vel = [1, 0];
      break;

    case 38: //Up
      if (vel[1] != 1)
        vel = [0, -1];
      break;

    case 40: //Down
      if (vel[1] != -1)
        vel = [0, 1];
      break;
  }
}

function setFoodPos() {
  let x = floor(random(w));
  let y = floor(random(h));
  
  while (isIn(x,y,"Snake")) {
    x = floor(random(w));
    y = floor(random(h));
  }
  foodPos = [x,y];
}