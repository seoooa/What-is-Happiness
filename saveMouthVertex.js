let input;
let img;
let faceapi;
let detections = [];

let mouth_bottom_angle = [];
let mouth_top_angle = [];

function preload() {
  txtFile1 = loadStrings('assets/coordinates.txt');
}
function setup() {
  createCanvas(700 , 700);
  
  // Create an input element for the user to upload an image
  input = createFileInput(handleFile);
  input.position(0, 0);
  
  // Initialize the face-api with the tiny face detector model
  const faceOptions = {
    withLandmarks: true,
    withDescriptors: false,
  };
  
  faceapi = ml5.faceApi(faceOptions, modelReady);
}

function modelReady() {
  console.log('FaceAPI model ready!');
}

function handleFile(file) {
  if (file.type === 'image') {
    img = createImg(file.data, '', '', imageReady);
    img.hide();
  } else {
    img = null;
  }
}

function imageReady() {
  faceapi.detect(img.elt, gotFaces);
}

function gotFaces(error, result) {
  if (error) {
    console.error(error);
    return;
  }

  detections = result;
  drawDetections();
}

function drawDetections() {
  image(img, 0, 0, width, height);

  if (detections.length > 0) {
    for (let i = 0; i < detections.length; i++) {
      const alignedRect = detections[i].alignedRect;
      const landmarks = detections[i].parts;

      // Draw the bounding box
      stroke(0, 255, 0);
      noFill();
      rect(
        alignedRect._box._x,
        alignedRect._box._y,
        alignedRect._box._width,
        alignedRect._box._height
      );

      // Draw the facial landmarks
      drawLandmarks(landmarks);
      // Calculate and display the angle of the mouth corners
      if (landmarks.mouth.length > 0) {
        

        //BOTTOM MOUTH
        const leftMouthCorner = landmarks.mouth[0];
        const rightMouthCorner = landmarks.mouth[6];
        const bottomMouthCenter = landmarks.mouth[Math.floor(landmarks.mouth.length / 2) - 1];
        
        fill(0, 255, 0)
        ellipse(leftMouthCorner._x, leftMouthCorner._y,5,5);
        ellipse(rightMouthCorner._x, rightMouthCorner._y,5,5);
        ellipse(bottomMouthCenter._x, bottomMouthCenter._y,5,5);

        const leftBottomMouthAngle = calculateAngle(leftMouthCorner, bottomMouthCenter);
        const rightBottomMouthAngle = calculateAngle(rightMouthCorner, bottomMouthCenter);
        
        mouth_bottom_angle.push(abs(leftBottomMouthAngle - rightBottomMouthAngle))
        
        drawAngle(leftMouthCorner, bottomMouthCenter, leftBottomMouthAngle, 'left');
        drawAngle(rightMouthCorner, bottomMouthCenter, rightBottomMouthAngle, 'right');
        
        /*----------------------------------*/
        
        //TOP MOUTH
        const leftTopMouthCorner = landmarks.mouth[1];
        const centerTopMouthCorner = landmarks.mouth[3]
        const rightTopMouthCorner = landmarks.mouth[5];
        
        fill(255, 255, 0)
        ellipse(leftTopMouthCorner._x, leftTopMouthCorner._y,5,5);
        ellipse(centerTopMouthCorner._x, centerTopMouthCorner._y,5,5);
        ellipse(rightTopMouthCorner._x, rightTopMouthCorner._y,5,5);
 
        const leftTopMouthAngle = calculateAngle(leftTopMouthCorner, centerTopMouthCorner);
        const rightTopMouthAngle = calculateAngle(rightTopMouthCorner, centerTopMouthCorner);
        
        
        mouth_top_angle.push(abs(leftTopMouthAngle - rightTopMouthAngle))

        drawAngle(leftTopMouthCorner, centerTopMouthCorner, leftTopMouthAngle, 'left');
        drawAngle(rightTopMouthCorner, centerTopMouthCorner, rightTopMouthAngle, 'right');
        
        print("bottom angle: " + mouth_bottom_angle)
        print("top angle: " + mouth_top_angle)
        
      }
    }
  }
}

function drawLandmarks(landmarks) {
  noStroke();
  fill(0, 0, 255);

  // Draw eyes, nose, and mouth
  for (let part in landmarks) {
    beginShape();
    for (let i = 0; i < landmarks[part].length; i++) {
      ellipse(landmarks[part][i]._x, landmarks[part][i]._y,5,5);
    }
    endShape(CLOSE);
  }
}

function calculateAngle(point1, point2) {
  const deltaY = point2._y - point1._y;
  const deltaX = point2._x - point1._x;
  const angle = atan2(deltaY, deltaX);
  return degrees(angle);
}

function drawAngle(point1, point2, angle, position) {
  noStroke();
  fill(255, 0, 0);
  textSize(16);
  textAlign(CENTER);

  let x = (point1._x + point2._x) / 2;
  let y = (point1._y + point2._y) / 2;

  if (position === 'left') {
    y -= 20;
  } else if (position === 'right') {
    y += 20;
  }

  text(nf(angle, 1, 2) + '°', x, y);

  stroke(255, 0, 0);
  line(point1._x, point1._y, point2._x, point2._y);
}

function keyPressed() {
  if (key == " ") {
    saveCoordinates()
    print("SAVE IT!")
  }
}

function saveCoordinates() {
  saveStrings(mouth_bottom_angle, 'mouthBottomAngle.txt');
  saveStrings(mouth_top_angle, 'mouthTopAngle.txt');
}

