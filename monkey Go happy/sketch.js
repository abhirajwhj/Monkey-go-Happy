
var monkey , monkey_running,monkey_collide
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var PLAY
var END
var gameState
var restart
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkey_collide=loadAnimation("sprite_0.png");
}



function setup() {
  createCanvas(600,600);
  
  
monkey=createSprite(200,400,40,40); 
monkey.addAnimation("monkey",monkey_running);
monkey.scale=0.2;
  
ground = createSprite(600,500,700,100);
ground.x = ground.width /2;
ground.velocityX = -6 ; 
ground.shapeColor="brown" 
FoodGroup=createGroup(); 
obstacleGroup=createGroup();
  
  score=0;
   restart=createSprite(240,60,100,40);
   restart.shapeColor="red"
}


function draw() {
     background("lightgreen");
  
  text("SCORE:"+score,400,50);
  textColor="darkgreen";
  monkey.setCollider("rectangle",0,0,30,30);
  monkey.debug=false;
  
  monkey.depth=ground.depth;
  monkey.depth=monkey.depth+1;
  
  
  if(gameState===PLAY){
     spawnObstacles();
     spawnFood();
    restart.visible=false;
  if(keyDown("space") &&  monkey.y >= 390) {
     monkey.velocityY=-14;
     }
   if (ground.x < 300){
      ground.x = ground.width/2;
   }
  monkey.velocityY=monkey.velocityY+0.5;
  monkey.collide(ground);
    
    if(monkey.isTouching(FoodGroup)){
       FoodGroup.destroyEach();
       score=score+1;
       }
  }
  if(monkey.isTouching(obstacleGroup)){
     gameState=END
     
    
  if(gameState===END){
     ground.velocityX=0;
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
     monkey.velocityY=0;
    
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    text("GAME OVER",200,100);
    score=0;
    monkey.changeAnimation("monkey3",monkey_collide);
    restart.visible=false;
    text("TAP to START",200,60);
    textColor="white"
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  }
  
  drawSprites();
}

function spawnObstacles(){
 if(frameCount%150===0){
    var obstacle = createSprite(600,450,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -6; 
   
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacleImage);
             obstacle.scale=0.2;
              break;
      case 2: obstacle.addImage(obstacleImage);
        obstacle.scale=0.4;
              break;
      case 3: obstacle.addImage(obstacleImage);
        obstacle.scale=0.3;
              break;
     
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
    
}

function spawnFood(){
if(frameCount%100===0){
   var banana=createSprite(600,320,10,40);
    banana.y = Math.round(random(250,320));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
   banana.velocityX=-7;
  
   banana.lifetime=200;
  
   FoodGroup.add(banana);
   }  
}

function reset(){
  gameState = PLAY;
  monkey.y=300;
  monkey.x=200;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  
  
  
  
  score = 0;
}
