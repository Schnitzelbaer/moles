// The video
let video;
// For displaying the label
let label = "waiting...";
// The classifier
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/GcWdYdMFX/';
let button;
let snapshots = [];
let cnv;
let imageShot;

// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

function setup() {
  cnv = createCanvas(800, 600);
  cnv.position(0, 0);
  // Create the video
  video = createCapture(VIDEO);
  video.size(800, 600);
  video.position(0, 0);
  // video.hide();
  // background(51);

  // button = createButton('Take Photo');
  // button.mousePressed(takesnap);
  // button2 = createButton('Analize');
  // button2.mousePressed(classifyImage);
  // button3 = createButton('Clear');
  // button3.mousePressed(clearImage);
}

// STEP 2 classify the videeo!
function classifyImage() {
  if (imageShot == true) {
    classifier.classify(snapshots[0], gotResults);
    label = "analizing...";
  }
}

function takesnap() {
  snapshots = [];
  snapshots.push(video.get());
  cnv.clear();
  label = "photo is taken";
  video.hide();
  imageShot = true;
}

function clearImage() {
  snapshots = [];
  cnv.clear();
  label = "waiting...";
  video.show();
  imageShot = false;
}

function draw() {
  // background(0);
  // for (var i = 0; i < snapshots.length; i++) {
  //   image(snapshots[i],0,0);
  // }

  if (imageShot == true) {
    image(snapshots[0],0,0);
  }

  // // STEP 4: Draw the label
  // textSize(24);
  // textAlign(CENTER, CENTER);
  // fill(0);
  // text(label, width / 2, height - 30);
  // // label.background(0);

  document.getElementsByClassName("result")[0].innerText = label;

}

// STEP 3: Get the classification!
function gotResults(error, results) {
  // Something went wrong!
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again!
  if (imageShot == true) {
    classifyImage();
    label = "Result: " + results[0].label;
  }
}
