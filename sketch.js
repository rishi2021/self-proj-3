/* PLAYING CHARACTER - the boy 
   NPC - stone, lumberjack 
the game has a main objective to climb a mountain and stop a lumberjack from cutting down a tree at the top of the mountain. Along the way you have
 to face many challenges such as falling boulders and platforms you have to jump on which only appear for a limited amount of time. 
 If the lumberjack takes 5 swings , the game ends as the tree has been cut so time is of the essence.
*/
var swings = 0
var player
var mountain
var stone_group
var platform_group
var flag = 0 
var lumberjack
var tree
var lumberjack_image
var tree_image
var gameState = "play"
var game_over
var score = 0
var win

function preload() {
player_image = loadImage("player.png")
background_image = loadImage("mountain.png")
rock_image = loadImage("boulder.png")
tree_image = loadImage("tree_image.png")
lumberjack_image = loadImage("lumberjack.png")
game_over_image = loadImage("game_over.png")
tree_chopped_image = loadImage("tree_image_chopped.png")
win_image = loadImage("win.png")
player_right = loadImage("player_left.png")
player_jump = loadImage("player_jump.png")
}

function setup(){
    var canvas = createCanvas(1850,1000);  
     
    mountain = createSprite(0,300,displayWidth,displayHeight);
    mountain.addImage(background_image);
    mountain.scale = 4.5
    player = createSprite(1400,700,10,10);
    player.addImage(player_image);
    player.scale = 0.2
    platform_group = new Group()
   // player.debug = true 
        
    var platform = createSprite(1400,730,115,5)
    platform.shapeColor = "black"
    platform_group.add(platform)
    var platform2 = createSprite(1080,950,115,5)
    platform2.shapeColor = "black"
    platform2.lifetime = 90
    platform_group.add(platform2)
    var platform3 = createSprite(830,835,115,5)
    platform3.shapeColor = "black"
    platform3.lifetime = 150
    platform_group.add(platform3)
    var platform4= createSprite(650,685,115,5)
    platform4.shapeColor = "black"
    platform4.lifetime = 210
    platform_group.add(platform4)
    var platform5 = createSprite(700,540,115,5)
    platform5.shapeColor = "black"
    platform5.lifetime = 270
    platform_group.add(platform5)
    var platform6 = createSprite(450,490,115,5)
    platform6.lifetime = 330
    platform6.shapeColor = "black"
    platform_group.add(platform6)
    var platform7 = createSprite(200,440,115,5)
    platform7.shapeColor = "black"
    platform7.lifetime = 390
    platform_group.add(platform7)
    var platform8 = createSprite(220,300,115,5)
    platform8.shapeColor = "black"
    platform8.lifetime = 450
    platform_group.add(platform8)
    var platform9 = createSprite(100,180,115,5)
    platform9.shapeColor = "black"
    platform9.lifetime = 600
    platform_group.add(platform9)
    var platform10 = createSprite(-150,100,115,5)
    platform10.shapeColor = "black"
    platform10.lifetime = 830
    platform_group.add(platform10)
    var platform1 = createSprite(-300,-75,115,5)
    platform1.shapeColor = "black"
    platform1.lifetime = 1400
    platform_group.add(platform1)  
    var platform11 = createSprite(-450,-250,115,5)
    platform11.shapeColor = "black"
    platform11.lifetime = 1600
    platform_group.add(platform11)      
    stone_group = new Group()

    platform_group.shapeColor = "black"
    tree = createSprite(-580,-330,115,5)
    
    tree.addImage(tree_image);
    tree.scale = 0.4
    tree.setCollider("rectangle",0,0,10,10);
    //tree.debug = true

    lumberjack = createSprite(-625,-290,115,5)
    lumberjack.addImage(lumberjack_image)
    lumberjack.scale = 0.2
    
    game_over = createSprite(925,500,50,50)
    game_over.addImage(game_over_image);
    game_over.visible = false

    win = createSprite(925,500,50,50)
    win.addImage(win_image);
    win.visible = false
}

    
    
    


function draw(){
    background(154,149,211);   
    if (gameState !== "end"){

    if (keyDown(UP_ARROW) && flag === 0){
         player.velocityY = -15
         player.addImage(player_jump)

        flag = 1
        console.log("flag1")
     }
     if(keyDown(RIGHT_ARROW)){
         player.x += 4
         player.addImage(player_right)

     }
     if(keyDown(LEFT_ARROW)){
        player.x -= 4
        player.addImage(player_image)
    }
    if(player.isTouching(tree)){
        gameState = "win"

    }
}

    if (stone_group.isTouching(player)||player.x>1850||player.y>1000){
        player.destroy();
        gameState = "end"
    }
     player.velocityY += 0.5
     mountain.velocityY = 0.3
     mountain.velocityX = 0.3
    console.log(tree.x,tree.y)
    platform_group.setVelocityXEach(0.3)
    platform_group.setVelocityYEach(0.3)
    //player.collide(platform_group)

    if (player.collide(platform_group)){
        flag = 0
        //console.log("flag0")
        
    }
    if (frameCount%400 === 0){
        swings++
    }
    if(swings === 5){
        tree.addImage(tree_chopped_image)
        gameState = "end"

    }
    
    lumberjack.velocityX = 0.3
    lumberjack.velocityY = 0.3
    tree.velocityX = 0.3
    tree.velocityY = 0.3
    if(gameState === "end"){
        game_over.visible = true
        stone_group.destroyEach()
        mountain.velocityY = 0
        mountain.velocityX = 0
        platform_group.setVelocityXEach(0)
        platform_group.setVelocityYEach(0)
        player.velocityX = 0
        player.velocityY = 0
        tree.velocityX = 0
        tree.velocityY = 0
        lumberjack.velocityX = 0
        lumberjack.velocityY = 0
    }  
    if(gameState === "win"){
        win.visible = true
        stone_group.destroyEach()
        mountain.velocityY = 0
        mountain.velocityX = 0
        platform_group.setVelocityXEach(0)
        platform_group.setVelocityYEach(0)
        player.velocityX = 0
        player.velocityY = 0
        tree.velocityX = 0
        tree.velocityY = 0
        lumberjack.velocityX = 0
        lumberjack.velocityY = 0
        swings  = 6
    } 
    //SpawnPlatform()
    if(gameState === "play"){
    Spawn_obstacles()
    score = Math.round(frameCount/100)    
    }
    
    

     drawSprites()
     fill("black")
     textSize(40)
     text(swings,1600,750);
     if(gameState === "play"){
     fill("black")
     textSize(40)
     text("score "+score,1600,30)
     text("move using arrow keys to reach the top of the mountain",300,50)
     }
     if (gameState === "win"){
         textSize(40)
         text("score "+score,850,800)
     }
}


function Spawn_obstacles(){
    if (frameCount%240 === 0){
        var stone = createSprite(random(0,900),random(0,900),20,20);
        stone_group.add(stone)
        stone.addImage(rock_image)
        stone.scale = 0.3
        stone.velocityY = 1
        stone.velocityX = 1

    }
}

//function SpawnPlatform(){
    //if(frameCount % 540 === 0){
        
    

    //}
//}