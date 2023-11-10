const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
let car = {
  width: 25,
  height: 90,
  x: canvas.width / 2,
  y: 0,
  varSpeed: 0.3,
  maxSpeed: 10,
};
let controls = {
  up: false,
  right: false,
  down: false,
  left: false,
};
let isTouchStart = false;
let oldTouchX = 0;
let oldTouchY = 0;
let interVal;
function drawCar() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "red";
  ctx.fillRect(car.x, car.y, car.width, car.height);
}

function controlsKeyUp(e) {
  if (e.key === "ArrowUp") controls.up = false;
  if (e.key === "ArrowRight") controls.right = false;
  if (e.key === "ArrowDown") controls.down = false;
  if (e.key === "ArrowLeft") controls.left = false;
  car.varSpeed = 0.3;
}
function controlsKeyDown(e) {
  if (e.key === "ArrowUp") controls.up = true;
  if (e.key === "ArrowRight") controls.right = true;
  if (e.key === "ArrowDown") controls.down = true;
  if (e.key === "ArrowLeft") controls.left = true;
  if (car.varSpeed <= car.maxSpeed) {
    if (controls.up) car.varSpeed -= 0.3;
    else if (controls.down) car.varSpeed += 0.3;
    if (controls.right) car.varSpeed += 0.3;
    else if (controls.left) car.varSpeed -= 0.3;
  }
}
function touchStart() {
  isTouchStart = true;
}

function touchEnd(e) {
  e.preventDefault();
  isTouchStart = false;
  car.varSpeed = 0.3;
  controls.down = false;
  controls.up = false;
}

function animate() {
  if (controls.up) {
    car.y += car.varSpeed;
  } else if (controls.down) {
    car.y += car.varSpeed;
  }

  if (controls.right) {
    car.x += car.varSpeed;
  } else if (controls.left) {
    car.x += car.varSpeed;
  }
  if (car.y <= 0) {
    car.varSpeed += -car.varSpeed * 2;
  } else if (car.y >= canvas.height - car.height) {
    car.varSpeed += -Math.abs(car.varSpeed) * 2;
  }
  if (car.x <= 0) {
    car.varSpeed += -car.varSpeed * 2;
  } else if (car.x >= canvas.width - car.width) {
    car.varSpeed += -Math.abs(car.varSpeed) * 2;
  }
  if (car.y >= canvas.height) {
    car.y = canvas.width - car.width;
  }
  requestAnimationFrame(animate);
  drawCar();
}
function animateTouch() {
  requestAnimationFrame(animateTouch);
  if (!isTouchStart) return;
  if (car.varSpeed <= car.maxSpeed) car.varSpeed += 0.2;
  car.y += car.varSpeed;
  if (car.y <= 0) {
    car.varSpeed += -car.varSpeed * 1.3;
  } else if (car.y >= canvas.height - car.height) {
    car.varSpeed += -Math.abs(car.varSpeed) * 1.3;
  }
  if (car.x <= 0) {
    car.varSpeed += -car.varSpeed * 1.3;
  } else if (car.x >= canvas.width - car.width) {
    car.varSpeed += -Math.abs(car.varSpeed) * 1.3;
  }
  drawCar();
}
if (navigator.platform === "Win32") {
  animate();
} else {
}
animateTouch();
drawCar();
window.addEventListener("keyup", controlsKeyUp);
window.addEventListener("keydown", controlsKeyDown);
window.addEventListener("touchend", touchEnd);
window.addEventListener("touchstart", touchStart);
