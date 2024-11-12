let input;
let img;
let faceapi;
let detections = [];

let mouth_angle = [];
let face_angle = [];
let eyes_angle = [];
let eyebrow_angle = [];

let coordinates = []

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

      print(landmarks)
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
        
        mouth_angle.push(abs(leftBottomMouthAngle - rightBottomMouthAngle))
        
        drawAngle(leftMouthCorner, bottomMouthCenter, leftBottomMouthAngle, 'left');
        drawAngle(rightMouthCorner, bottomMouthCenter, rightBottomMouthAngle, 'right');
        
        /*----------------------------------*/
        
        //TOP MOUTH
        const leftTop1MouthCorner = landmarks.mouth[1];
        const leftTop2MouthCorner = landmarks.mouth[2];
        const centerTopMouthCorner = landmarks.mouth[3]
        const rightTop1MouthCorner = landmarks.mouth[4];
        const rightTop2MouthCorner = landmarks.mouth[5];
        
        fill(255, 255, 0)
        ellipse(leftTop1MouthCorner._x, leftTop1MouthCorner._y,5,5);
        ellipse(leftTop2MouthCorner._x, leftTop2MouthCorner._y,5,5);
        ellipse(centerTopMouthCorner._x, centerTopMouthCorner._y,5,5);
        ellipse(rightTop1MouthCorner._x, rightTop1MouthCorner._y,5,5);
        ellipse(rightTop2MouthCorner._x, rightTop2MouthCorner._y,5,5);
 
        const leftLowMouthAngle = calculateAngle(leftMouthCorner, bottomMouthCenter);
        const rightLowMouthAngle = calculateAngle(rightMouthCorner, bottomMouthCenter);
        
        mouth_angle.push(abs(leftLowMouthAngle - rightLowMouthAngle))
        
        print(mouth_angle)
        
        drawAngle(leftMouthCorner, bottomMouthCenter, leftLowMouthAngle, 'left');
        drawAngle(rightMouthCorner, bottomMouthCenter, rightLowMouthAngle, 'right');
        
//         //FACE
//         const highestNose = landmarks.nose[0];
//         const lowestNose = landmarks.nose[6]
        
//         fill (255, 255, 0);
//         ellipse(highestNose._x, highestNose._y,5,5);
//         ellipse(lowestNose._x, lowestNose._y,5,5);
        
//         const noseAngle = calculateAngle(highestNose, lowestNose);
//         face_angle.push(abs(noseAngle - 90))
        
//         drawAngle(highestNose, lowestNose, noseAngle, 'left')
        
//         print(face_angle);
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
      
      coordinates.push(landmarks[part][i]._x,landmarks[part][i]._y);
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
  saveStrings(coordinates, 'coordinates.txt');
}
