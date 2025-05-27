let points = [];
let x = 0.01;
let y = 0;
let z = 0;

let a = 10;
let b = 28;
let c = 8.0 / 3.0;
let attractorScale = 12; // Increased scale factor for the drawing

let themeBgColor;
const trailAlpha = 20; // Opacity for the fading trails

function updateThemeCanvasColor() {
  // Get the computed background color string from the CSS variable
  const bodyStyle = getComputedStyle(document.body);
  const bgColorString = bodyStyle.getPropertyValue('--bs-body-bg').trim();

  if (bgColorString) {
    themeBgColor = color(bgColorString); // p5.js color object
  } else {
    themeBgColor = color(0); // Fallback to black if CSS variable is not found
    console.warn("Could not determine theme background color. Falling back to black.");
  }
}

function setup() {
  // These variables were declared but not used.
  // mainWidth = document.querySelector('main').offsetWidth
  // sideWidth = (windowWidth - mainWidth) / 2
  let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent('canvas-container')
  
  updateThemeCanvasColor(); // Get initial theme color
  background(themeBgColor);   // Set initial background to the theme color

  // Observe changes to the data-bs-theme attribute on the html element
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-bs-theme') {
        updateThemeCanvasColor(); // Update color when theme changes
        // For an immediate change of the solid background on theme switch:
        // background(themeBgColor); // Uncomment if you want the whole canvas to refresh color instantly
      }
    }
  });
  observer.observe(document.documentElement, { attributes: true });
}

function draw() {
  // Use the theme color for the fading trails
  if (themeBgColor) {
    background(themeBgColor.levels[0], themeBgColor.levels[1], themeBgColor.levels[2], trailAlpha);
  } else {
    background(0, trailAlpha); // Fallback if themeBgColor isn't set
  }

  rotateX(PI / 6);   // fixed camera angle
  rotateZ(frameCount * 0.002); // slow rotation for effect

  let dt = 0.01;
  let dx = a * (y - x) * dt;
  let dy = (x * (b - z) - y) * dt;
  let dz = (x * y - c * z) * dt;

  x += dx;
  y += dy;
  z += dz;

  points.push(createVector(x, y, z));
  if (points.length > 2000) {
    points.shift();
  }

  noFill();
  stroke(255);
  beginShape();
  for (let v of points) {
    vertex(v.x * attractorScale, v.y * attractorScale, v.z * attractorScale);
  }
  endShape();
}

function windowResized() {
  // It's good practice to also update the color reference if a resize might imply a re-init
  // updateThemeCanvasColor(); // Potentially update if needed, though observer should handle theme changes
  resizeCanvas(windowWidth, windowHeight);
  background(themeBgColor); // Re-apply solid background on resize with current theme color
}
