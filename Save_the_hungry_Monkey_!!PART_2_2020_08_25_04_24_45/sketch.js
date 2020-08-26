//declare variables.
var monkey, monkey_running;
var backRound, bananaGroup, back_img,obstacleGroup,banana_img,obstacle_img;
//for score
var survivaltime=0;
var ground;
//for the gameStates.
var PLAY=0;
var END=1;
var gameState=PLAY;

//function preload.
function preload(){
  
  //load animation for the running monkey.
  monkey_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  //load images.
  back_img=loadImage("jungle.jpg");
  
  banana_img=loadImage("banana.png");
  
  obstacle_img=loadImage("stone.png");
}
//function setup
function setup() {
  //create canvas
  createCanvas(500, 350);
  
   //create sprite for the backround
   backRound=createSprite(0,0,400,400);
   //ad image.
   backRound.addImage(back_img);
   //give velocity.
   backRound.velocityX=-6;
   //infinite game space.
   backRound.x = backRound.width/2;
  
  
   //create sprite for monkey.
   monkey=createSprite(100,250,10,10);
   //scale it.
   monkey.scale=0.1;
   //add animation.
   monkey.addAnimation("running",monkey_running);
  
  
   //create the ground and make it invisible.
   ground=createSprite(250,260,400,20);
   ground.visible=false;
   
  
   //create groups for the bananas and obstacles.
   bananaGroup=new Group();
   obstacleGroup=new Group();
  
}
//function draw.
function draw() {
  
  background(220);
  
  //if gameState= PLAY.
  if(gameState===PLAY){
    
     //make the monkey jump when space is pressed.
     if(keyDown("space")&&monkey.y>=175){
        monkey.velocityY=-14;
      }
    
      //add gravity.
      monkey.velocityY=monkey.velocityY+0.8;
  
     //creating infinite game space.
    if(backRound.x<0){
      backRound.x = backRound.width/2;
     }
    
    //call the functions
    banana();
    rock();
    
    //increase the score if the monkey eats the bananas
    if(bananaGroup.isTouching(monkey)){
      survivaltime=survivaltime+2;
      bananaGroup.destroyEach();
    }
    
    //use switch command for scaling the monkey after a score.
  switch(survivaltime){
    case 10: monkey.scale=0.12;
      break;
    case 20: monkey.scale=0.14;
      break;
    case 30: monkey.scale=0.16;
      break;
    case 40: monkey.scale=0.18;
      break;
    case 50: monkey.scale=0.20;
      break;
    default:break;
  }
    
      //make the game end if the score is 50.
    if(survivaltime===50){
      gameState=END;
    }
    //decrease the scale of the monkey if it touches the rock.
    if(obstacleGroup.isTouching(monkey)){
        monkey.scale=0.1;
     }

    //if gameState is END.
    }else if(gameState===END){
            //set the velocity of the monkey to 0.
            monkey.velocityY=0;
      
            //destroy each.
            obstacleGroup.destroyEach();
            bananaGroup.destroyEach();
            monkey.destroy();
      
           //display text.
           textSize(20);
           fill("red");
           text("CONGO!!",200,200);
    }
  
  //collide the monkey with the ground.
  monkey.collide(ground);
  
  //draw the sprites.
  drawSprites();
  
  //display the survivaltime.
  textSize(20);
  fill("white");
  text("Score:"+survivaltime,300,50);
}

//function for banana
function banana(){
  
  //displaying a banana every 80 frames.
  if(frameCount%50===0){
    var banana1=createSprite(500,random(75,175),10,40);
    //add image.
    banana1.addImage("banana4",banana_img);
    //set a velocity and scale it.
    banana1.velocityX=-8;
    banana1.scale=0.05;
    banana1.lifetime=400;
    
    //adding the banana to its respective group.
    bananaGroup.add(banana1);
    
  }
}

//function for rock.
function rock(){
  
  //displaying a rock every 300 frames.
  if(frameCount%150===0){
    var rock1=createSprite(500,240,20,20);
    //add image.
    rock1.addImage("rock7",obstacle_img);
    //give velocity and scale it.
    rock1.velocityX=-6;
    rock1.scale=0.15;
    rock1.lifetime=134;
    
    //adding the rock to its respective group.
    obstacleGroup.add(rock1);
    
  }

}










