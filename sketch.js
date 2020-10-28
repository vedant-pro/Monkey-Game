var ground,backGroundImage,backGround     
var monkey , monkey_running
var banana ,bananaImage ,bananaGroup , obstacle, obstacleImage
var obstacleGroup
var score
var survivalTime=0
function preload(){
  
  backGroundImage = loadImage("jungle.jpg")
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(400, 400); 
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x=ground.width/2
  ground.visible=false
  
  backGround=createSprite(400,200,800,400)
  backGround.addImage(backGroundImage)
  backGround.scale=3.0
  backGround.velocityX = -4;
  backGround.x=backGround.width/2
  backGround.depth=monkey.depth
  monkey.depth+=1
 
  
  bananaGroup=new Group()
  obstacleGroup=new Group()
}


function draw() {
background(200)
  if(keyDown("space")){
    monkey.velocityY = -15;
  }
 if(bananaGroup.isTouching(monkey)){
   bananaGroup.destroyEach()
 }
  monkey.velocityY = monkey.velocityY + 0.8
   monkey.collide(ground);
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale=0.2;
  }
 food() 
 rocks()
  switch(survivalTime){
    case 10: monkey.scale=0.12;
          break;
    case 20: monkey.scale=0.14;
          break;
    case 30: monkey.scale=0.16;
          break;
    case 40: monkey.scale=0.18;
          break;
    default: break;
  }
  
drawSprites();
 stroke("white")
  textSize(20)
  fill("white")
  survivalTime=Math.ceil(frameCount/frameRate())
  text("SurvivalTime: "+survivalTime, 100,50)  
}
function food(){
if(World.frameCount%80===0)  {
  banana=createSprite(600,200,10,10)
  banana.y=Math.round(random(120,200))
  banana.addImage(bananaImage)
  banana.scale=0.1
  banana.velocityX=-3
  banana.setLifetime=100
  bananaGroup.add(banana)
}
}
function rocks(){
  if(World.frameCount%300===0){
    obstacle=createSprite(600,315,20,20)
    obstacle.addImage(obstacleImage)
    obstacle.scale=0.1
    obstacle.velocityX=-3
    obstacle.setLifetime=100
    obstacleGroup.add(obstacle)
  }
}





