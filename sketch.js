var database,ref,doremonPosition;
var doremon,doremonImg;
var ground;

function preload()
{

  doremonImg=loadImage("doremon.png");
  ground = loadImage("backgroundd.jpg")

}

function setup(){
    createCanvas(1350, 650);

    database = firebase.database();
    ref = database.ref('doremon/position')
    ref.on("value",readPosition,showError);

    doremon = createSprite(250,400,10,10);
    doremon.addImage(doremonImg);
    doremon.scale = 0.3;

}

function draw(){
    background(ground);
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
        (doremon.scale = doremon.scale - 0.0015)
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
        (doremon.scale=doremon.scale+0.0015)
    }



    drawSprites();
}

function writePosition(x,y){
 
    database.ref('doremon/position').set({
        x: doremonPosition.x + x,
        y : doremonPosition.y + y
    });

}

function readPosition(data)
{

    doremonPosition = data.val();
    doremon.x = doremonPosition.x;
    doremon.y = doremonPosition.y;

}

function showError()
{

console.log("Error is occured")

}