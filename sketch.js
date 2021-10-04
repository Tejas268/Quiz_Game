//image variables
var bg, questionIMG, resultIMG

var db, w, h, question, input, answerInput, submit, result, thisIndex, thisName, Answer;

var playerCount = 0;

function preload() {
  questionIMG = loadImage("quiz.jpg");
  resultIMG = loadImage("result.png");
  bg = loadImage("bg.png");
}

function setup() {
  w = windowWidth;
  h = windowHeight;

  if(h < w) {
    createCanvas(h -10, h -10);
  }
  else {
    createCanvas(w, w);
  }
  db = firebase.database();

  question = createSprite(h/2, h/1.8);
  question.addImage(questionIMG);
  question.scale = 1.8;

  result = createSprite(h/2, h/1.8);
  result.addImage(resultIMG);
  result.scale = 2;
  result.visible = false;


  input = createInput("").attribute("placeholder", "Enter Your Name");
  input.position(h/2.8, 22)
  input.class("customInput");

  answerInput = createInput("").attribute("placeholder", "Answer");
  answerInput.position(h/1.485, h/1.15)
  answerInput.class("customInput");

  submit = createButton("Submit");
  submit.position(h/1.28, h/1.06);
  submit.class("customButton");
}


function draw(){
  background("white");

  submit.mousePressed(() => {
    handleElements();
    getCount();
    playerCount += 1
    thisIndex = playerCount;
    thisName = input.value();
    Answer = answerInput.value();
    updateCount(playerCount);
    db.ref("contestants/contestant" + thisIndex).set({
      name : thisName,
      answer : Answer

    });
  });

  drawSprites();
}

function handleElements() {
  submit.hide();
  answerInput.hide();
  input.hide();
  question.visible = false;
  result.visible = true;
}
function updateCount(count) {
    db.ref("/").update({
      playerCount : count
    })
  }
function getCount() {
    db.ref("playerCount").on("value", (data)=>{
      playerCount = data.val();
      console.log(playerCount);
    })
  }