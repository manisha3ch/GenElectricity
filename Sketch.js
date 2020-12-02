/*
Author: Manisha R
Created On: 20 ‎November ‎2020
Modified On: 22 ‎November ‎2020
Purpose: Project  - Generate electricity for the village.
*/ 
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var canvasWidth = 800,canvasHeight = 500;
var turbineSprite;
var turbineRotateBy =0;
var angle = 45;
var arrCurrents =[[465,225],[165,440],[100,300],[190,245],[260,200],[300,165],[300,100]];
var grpCurrent;
var ground;


function preload()
{
	backgroundIMG = loadImage("FinalImage.png");
	turbineIMG=loadImage("wheel.png");
	damIMG=loadImage("water.png");
	electricityIMG=loadImage("electricity.png");
	bulbIMG=loadImage("b1.png");
	bulb1IMG=loadImage("b2.png");
}

function setup() {
	createCanvas(canvasWidth, canvasHeight);

	engine = Engine.create(); // create your engine object 
	world = engine.world;     // create your world.


	angleMode(DEGREES);

	turbineSprite=createSprite(720, 320,100,10);
	turbineSprite.addImage("turbine",turbineIMG);
	turbineSprite.scale=0.3

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.visible = false;
	groundSprite.shapeColor=color(255);

	bulbSprite=createSprite(width/2-150 , height-450, 100,100);
	bulbSprite.addImage("bulbOff",bulbIMG);
	bulbSprite.addImage("bulbOn",bulb1IMG);
	bulbSprite.scale = 0.3

	waterSprite=createSprite(width-125, 380, width/8,height);
	waterSprite.addImage(damIMG);
	waterSprite.scale = 0.4;

//Create a Ground
	ground = Bodies.rectangle(width/2,canvasHeight, width, 10 , {isStatic:true} );
	World.add(world, ground);

	turbineBody=Bodies.rectangle(720,320, 100,10, {
		isStatic: true,
		inertia: Infinity,// setting inertia to infinty will prevent rotation upon collision
		currentRotation: 0,
		rotationSpeed: 20
	});
	World.add(world, turbineBody);

	//	Engine.run(engine);
	// create a renderer
	var render = Render.create({
		element: document.body,
		engine: engine,
		options: {
		  width: 800,
		  height: 500,
		  wireframes: false
		}
	  });
  // run the renderer
	Render.run(render);
}

function draw() {
  background(backgroundIMG);
  rectMode(CENTER);
  Engine.update(engine);
  turbineRotate();
	drawSprites();
	stroke(0);
	console.log(mouseX);
	console.log(mouseY );
}

function keyPressed(){
	if (keyCode === RIGHT_ARROW) {
		for (var i = 0; i < arrCurrents.length; i++){
			push();
			translate(arrCurrents[i][0],arrCurrents[i][1]); // displayed location on canvas;
			imageMode(CENTER);
			electricityIMG.resize(15,0)
			image(electricityIMG, 0, 0);
			pop();	
			turbineBody.currentRotation += 1*turbineBody.rotationSpeed;
			Body.setAngle(turbineBody, turbineBody.currentRotation);			
			bulbSprite.changeImage("bulbOn",bulb1IMG);
		 }
	}
}

function keyReleased(){
		bulbSprite.changeImage("bulbOff",bulbIMG);		
}

function turbineRotate(){
	turbineSprite.x= turbineBody.position.x ;
	turbineSprite.y= turbineBody.position.y;
	push();
	translate(turbineSprite.x,turbineSprite.y); // displayed location on canvas
	ang = turbineBody.angle; 
	rotate(ang);
	imageMode(CENTER);
	turbineIMG.resize(150,0)
	image(turbineIMG, 0, 0);
	ang = ang +5;
	pop();
}

