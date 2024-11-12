let coordinates = [];

function setup() {
  createCanvas(640, 480);
  
  // Create an input element for the user to upload a text file
  const fileInput =  createFileInput(handleFile);

}

function handleFile(file) {
  if (file.type === 'text') {
    const lines = file.data.split('\n');
    coordinates = [];
    for (let i = 0; i < 137 - 1; i += 2) {
      const x = parseFloat(lines[i]);
      const y = parseFloat(lines[i + 1]);
      if (!isNaN(x) && !isNaN(y)) {
        coordinates.push({ x, y });
      }
    }
  }
}

function draw() {
  background(255);
  // Draw circles at the coordinates
  for (let i = 0; i < coordinates.length; i++) {
    const { x, y } = coordinates[i];
    fill(0);
    noStroke();
    ellipse(x, y, 5, 5);
  }
}

function keyPressed() {
  if (key == " ") {
    saveCoordinatesImage()
    print("SAVE IT!")
  }
}

function saveCoordinatesImage() {
  saveCanvas('myCanvas', 'png');
}
