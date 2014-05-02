//console.log("HERE!")
var startWidth = view.size.width; 
//console.log(startWidth);

//window responsiveness- to get the window to stop reloading and redrawing all the time 
var lastTimeDraw = 0;

//to get millisceonds
// var d = new Date();


//points for drawing
var previousPoints = new Array();

var previousSize = view.size;

var points = [];
var circleSize = view.size.width/12;
var maxPoint;

var point = new Point(0, 0);
var size = new Size(circleSize, circleSize);
var shape = new Shape.Rectangle(point, size);

var curCirclesGroup;

function getDistance(x1, y1, x2, y2) {
	var xLeg = x1 - x2;
	var yLeg = y1 - y2;
	//this is pygathorem's theorum which is the hyptonus squared = equals one leg squared plus the other leg squared 
	//zsquared = xsquared + ysquared 
	return Math.sqrt(Math.pow(xLeg, 2) + Math.pow(yLeg, 2));
}

function doesOverlap(x, y) {
	for (var j = 0; j < points.length; j++) {
		var distance = getDistance(x, y, points[j].x, points[j].y);
		//console.log("Distance: " + distance);
		if (distance < (circleSize + 60)) {
			//console.log("Overlap detected");
			return true;
		}
	}

	//console.log("No overlap");
	return false;
}

function redraw() {
	project.activeLayer.removeChildren();
	previousSize = view.size;


//-----------------------------------
	//middle one 
	var whiteGroup1 = new Group({
		children: null
	});

	//this draws the raster
	var raster1 = new Raster ('white');
	raster1.scale(0.2);
	if (previousPoints[0]){
		//this is essentially aspect ratio. its scaling 
		raster1.position = new Point(previousPoints[0].x*view.size.x/previousSize.x, previousPoints[0].y*view.size.y/previousSize.y);
		previousPoints[0] = raster1.position; 
	} else {
		//this is what hte above is scaling to- b/c it has to be in relation to this very specific point for my map 
		raster1.position = new Point(400,500);
		previousPoints.push(raster1.position);

	}
	
	points.push({ x:raster1.position.x, y:raster1.position.y });

	var textObj1 = new PointText({
		point: [raster1.position.x, raster1.position.y],
		content: "WIKIPEDIA",
		visible: false
	});

	whiteGroup1.addChild(raster1);
	whiteGroup1.addChild(textObj1);

	whiteGroup1.onMouseEnter = function(event) {
		console.log("text appear");
		this.children[1].visible = true;
	}

	whiteGroup1.onMouseLeave = function(event) {
		console.log("text appear");
		this.children[1].visible = false;
	}

//-----------------------------------
//bottom one 
	var whiteGroup2 = new Group({
		children: null
	});
	
	var raster2 = new Raster ('white');
	raster2.scale(0.2);
	raster2.position = new Point(view.size.width/5,600);
	points.push({ x:raster2.position.x, y:raster2.position.y });

	var textObj2 = new PointText({
		point: [raster2.position.x, raster2.position.y],
		content: "GOOGLE IMAGES",
		visible: false
	});

	whiteGroup2.addChild(raster2);
	whiteGroup2.addChild(textObj2);

	whiteGroup2.onMouseEnter = function(event){
		this.children[1].visible = true;
	}

	whiteGroup2.onMouseLeave = function(event){
		this.children[1].visible = false; 
	}


//-----------------------------------
	//this is the top one 
	var whiteGroup3 = new Group({
		children: null
	});

	var raster3 = new Raster ('white');
	raster3.scale(0.2);
	raster3.position = new Point(500,100);
	points.push({ x:raster3.position.x, y:raster3.position.y });

	var textObj3 = new PointText({
		point: [raster3.position.x, raster3.position.y],
		content: "POP UP AUDIO",
		visible: false
	}); 

	whiteGroup3.addChild(raster3);
	whiteGroup3.addChild(textObj3);

	whiteGroup3.onMouseEnter = function(event){
		this.children[1].visible = true;
	}

	whiteGroup3.onMouseLeave = function(event){
		this.children[1].visible = false; 
	}
// };


	maxPoint = new Point(view.size.width-(circleSize/2), view.size.height-(circleSize/2));
	console.log("Max point: " + maxPoint);
	console.log(circleSize);

	var whiteCirclesGroup = new Group({
		children: null
	});

	for (var i = 0; i < 10; i++) {
		console.log("New circle");
		// Create a raster item using the image tag with id='____'
		var raster = new Raster('circle');
		raster.scale(1);

		raster.fitBounds(shape.bounds);
		var randomPoint = new Point();

		do {
			randomPoint = Point.random();

			// Move the raster to the center of the view
			raster.position = randomPoint * maxPoint;
			console.log("New position: " + raster.position);
		} while(doesOverlap(raster.position.x, raster.position.y));

		points.push({ x:raster.position.x, y:raster.position.y });

		// Rotate the raster by 45 degrees:
		//raster.rotate(45);

		whiteCirclesGroup.addChild(raster);
		console.log(whiteCirclesGroup);
	}

	console.log("done with first for loop");

	for (var i = 0; i < whiteCirclesGroup.children.length; i++) {

		whiteCirclesGroup.children[i].onMouseEnter = function(event) {

			this.visible = false;
		}

		whiteCirclesGroup.children[i].onMouseLeave = function(event) {
			this.visible = true;
		}
	}
	curCirclesGroup = project.activeLayer.children[3];
	readyForResize = true;

	var d = new Date();
	lastTimeDraw = d.getTime();
}

redraw();
//X and Y will move with new point 


// var readyForResize = false;
function onResize(){
	
// 	//console.log(view.size.width + ' x ' + view.size.height);
	if (readyForResize){
// 		//console.log("RESIZE!!!");
		var circleSizeUpdate = view.size.width/12;
		for (var i = 0; i < curCirclesGroup.children.length; i++){
			curCirclesGroup.children[i].image.width = circleSizeUpdate;
		}
	}
}




$(window).resize(function(){
	var d = new Date();
	if (d.getTime()>(lastTimeDraw + 1000) && readyForResize){
			redraw();
			console.log("resized the image");
	} else{
		console.log("skipping redraw " + d.getTime() +  " " + readyForResize);
	}
	
});
