var points = [];
var circleSize = 100;
var maxPoint;
var point = new Point(0, 0);
var size = new Size(circleSize, circleSize);
var shape = new Shape.Rectangle(point, size);

function getDistance(x1, y1, x2, y2) {
	var xLeg = x1 - x2;
	var yLeg = y1 - y2;
	return Math.sqrt(Math.pow(xLeg, 2) + Math.pow(yLeg, 2));
}

function doesOverlap(x, y) {
	for (var j = 0; j < points.length; j++) {
		var distance = getDistance(x, y, points[j].x, points[j].y);
		console.log("Distance: " + distance);
		if (distance < (circleSize + 10)) {
			console.log("Overlap detected");
			return true;
		}
	}

	console.log("No overlap");
	return false;
}

function redraw() {
	project.activeLayer.removeChildren();
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

	


//-----------------------------------
	//middle one 
	var cuteGroup1 = new Group({
		children: null
	});

	//this draws the raster
	var raster1 = new Raster ('cute');
	raster1.scale(0.3);
	raster1.position = new Point(400,300);

	var textObj1 = new PointText({
		point: [raster1.position.x, raster1.position.y],
		content: "WIKIPEDIA",
		visible: false
	});

	cuteGroup1.addChild(raster1);
	cuteGroup1.addChild(textObj1);

	cuteGroup1.onMouseEnter = function(event) {
		console.log("text appear");
		this.children[1].visible = true;
	}

	cuteGroup1.onMouseLeave = function(event) {
		console.log("text appear");
		this.children[1].visible = false;
	}

//-----------------------------------
//bottom one 
	var cuteGroup2 = new Group({
		children: null
	});
	
	var raster2 = new Raster ('cute');
	raster2.scale(0.3);
	raster2.position = new Point(200,700);

	var textObj2 = new PointText({
		point: [raster2.position.x, raster2.position.y],
		content: "GOOGLE IMAGES",
		visible: false
	});

	cuteGroup2.addChild(raster2);
	cuteGroup2.addChild(textObj2);

	cuteGroup2.onMouseEnter = function(event){
		this.children[1].visible = true;
	}

	cuteGroup2.onMouseLeave = function(event){
		this.children[1].visible = false; 
	}


//-----------------------------------
	//this is the top one 
	var cuteGroup3 = new Group({
		children: null
	});

	var raster3 = new Raster ('cute');
	raster3.scale(0.3);
	raster3.position = new Point(900,100);

	var textObj3 = new PointText({
		point: [raster3.position.x, raster3.position.y],
		content: "POP UP AUDIO",
		visible: false
	}); 

	cuteGroup3.addChild(raster3);
	cuteGroup3.addChild(textObj3);

	cuteGroup3.onMouseEnter = function(event){
		this.children[1].visible = true;
	}

	cuteGroup3.onMouseLeave = function(event){
		this.children[1].visible = false; 
	}
// };

}

redraw();
//X and Y will move with new point 





//$(function() {
//	$(window).resize(redraw).triggerHandler('resize');
//});