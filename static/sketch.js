let attractors = [];
const attractorScale = 20;
let themeBgColor;

// Current camera angles
let camAngleX = 0, camAngleY = 0, camAngleZ = 0;
// Target camera angles
let targetCamAngleX = 0, targetCamAngleY = 0, targetCamAngleZ = 0;
// Speed of interpolation
let angleLerpSpeed = 0.1;

function updateThemeCanvasColor() {
  const bgColorString = getComputedStyle(document.body).getPropertyValue('--bs-body-bg').trim();
  themeBgColor = bgColorString ? color(bgColorString) : color(0);
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent('canvas-container');
  updateThemeCanvasColor(); // Initial theme color

  // Generate multiple attractors
  let xyz = [9.081440237872517, -3.9368300928020394, 4.7516060384656775];
  attractors.push(generateLorenzAttractor(xyz[0], xyz[1], xyz[2]));

  // Initialize current and target camera angles to the same random values
  camAngleX = targetCamAngleX = random(TWO_PI);
  camAngleY = targetCamAngleY = random(TWO_PI);
  camAngleZ = targetCamAngleZ = random(TWO_PI);

  // Observe changes to the data-bs-theme attribute on the html element
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-bs-theme') {
        updateThemeCanvasColor(); // Update color when theme changes
        loop(); // Ensure the draw loop runs to apply the new background
      }
    }
  });
  observer.observe(document.documentElement, { attributes: true });

  loop(); // Start continuous drawing for interpolation and initial render
}

function draw() {
  if (themeBgColor) {
    background(themeBgColor);
  } else {
    background(0);
  }

  // Interpolate camera angles toward target
  camAngleX = lerp(camAngleX, targetCamAngleX, angleLerpSpeed);
  camAngleY = lerp(camAngleY, targetCamAngleY, angleLerpSpeed);
  camAngleZ = lerp(camAngleZ, targetCamAngleZ, angleLerpSpeed);

  rotateX(camAngleX);
  rotateY(camAngleY);
  rotateZ(camAngleZ);

  noFill();
  stroke(255);
  for (let points of attractors) {
    beginShape();
    for (let v of points) {
      vertex(v.x * attractorScale, v.y * attractorScale, v.z * attractorScale);
    }
    endShape();
  }

  // Stop the loop if camera is close enough to target
  if (
    isCloseEnough(camAngleX, targetCamAngleX) &&
    isCloseEnough(camAngleY, targetCamAngleY) &&
    isCloseEnough(camAngleZ, targetCamAngleZ)
  ) {
    noLoop();
  }
}

function generateLorenzAttractor(x, y, z) {
  let a = 10, b = 28, c = 8.0 / 3.0;
  let dt = 0.02;
  let points = [];

  for (let i = 0; i < 1000; i++) {
    let dx = a * (y - x) * dt;
    let dy = (x * (b - z) - y) * dt;
    let dz = (x * y - c * z) * dt;

    x += dx;
    y += dy;
    z += dz;

    points.push(createVector(x, y, z));
  }

  return points;
}

function isCloseEnough(a, b) {
  return abs(a - b) < 0.1;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  updateThemeCanvasColor(); // Also update color on resize, in case of dynamic changes
  loop(); // Ensure redraw if it was stopped
}
