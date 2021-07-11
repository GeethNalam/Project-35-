var dog, happyDog;
var foodS, foodStock;
var database;

function preload()
{
	dogImg = loadImage("images/dogImg.png")
  happyDogImg = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500,500);
  database = firebase.database();
  dog = createSprite(250,250);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
background(46,139,87);



if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDogImg);
 
}

if(keyWentUp(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(dogImg);
 }
 
drawSprites();
textSize(20);
  fill(225);
    text("Note: Press UP ARROW to Feed Drago milk", 50,50);
    text("Food Remaining" + foodS, 150,150);
}
 
 
  

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }else{
    x=x-1;
  }


database.ref('/').update({
  Food:x
 })
}