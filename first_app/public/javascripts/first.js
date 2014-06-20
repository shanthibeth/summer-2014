//first.js


$(document).ready(function(){


	var margin = {top: 20, right: 30, bottom: 30, left: 40},
    	width = 500 - margin.left - margin.right,
   		height = 400 - margin.top - margin.bottom;

   	var x = d3.scale.linear()
   		.range([-6, width])

	var y = d3.scale.linear()
		.range([height, 0])

	var xAxis = d3.svg.axis()
		.scale(x)
		.ticks(0)
		.orient("bottom")

	var yAxis = d3.svg.axis()
		.scale(y)
		.ticks(0)
		.orient("left")

/*	var exText = svg.append("text")
		.attr("x", 300)
		.attr("y", 200)
		.text("hello")*/

	var chart = d3.select(".chart")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  	chart.append("g")
      	.attr("class", "x axis")
      	.attr("transform", "translate(0," + height + ")")
      	.call(xAxis);

  	chart.append("g")
      	.attr("class", "y axis")
      	.call(yAxis);
<<<<<<< HEAD
//private linear supply curve
	var supply = chart.append("line")
		.style("stroke", "blue")
		.style("stroke-width", 2)
		.attr("x1", 0)
		.attr("x2", width)
		.attr("y1", 300)
		.attr("y2", 100)
<<<<<<< HEAD


	var supplyPath = chart.append("path")
    	.attr("id", "path2")
    	.attr("d", "M 0,300 L 430,100");

	var supplyText = chart.append("text")
    	//.attr("x", 8)
    	.attr("dx", 400)
    	.attr("dy", -5)
    	.style("font-size", 12)
    	.attr("fill","blue")
  		.append("textPath")
    		.attr("class", "textpath")
    		.attr("xlink:href", "#path2")
    		.text("Supply Curve");

	// var supplyPath = chart.append("path")
	// 	.attr("d", "M " + width-60 + " " + 290 + " L " + width + " " + 350 + " L " + width-60 + " " + 290)


	// var supplyLabel = chart.append("text")
	// 	.attr("x", width-60)
	// 	.attr("y", 290)
	// 	.append(supplyPath)
	// 		.text("Supply curve")


	var mpbPath = chart.append("path")
    	.attr("id", "path")
    	.attr("d", "M 0,50 L 430,250");

	var mpbText = chart.append("text")
    	//.attr("x", 8)
    	.attr("dx", 385)
    	.attr("dy", 42)
    	.style("font-size", 12)
    	.attr("fill","red")
  		.append("textPath")
    		.attr("class", "textpath")
    		.attr("xlink:href", "#path")
    		.text("Private Benefit");
	
	var msbPath = chart.append("path")
    	.attr("id", "path")
    	.attr("d", "M 0,50 L 430,250");

	var msbText = chart.append("text")
    	//.attr("x", 8)
    	.attr("dx", 385)
    	.attr("dy", -5)
    	.style("font-size", 12)
    	.attr("fill","orange")
    	.style("opacity",0.0)
  		.append("textPath")
    		.attr("class", "textpath")
    		.attr("xlink:href", "#path")
    		.text("Social Benefit");

	var msbF = chart.append("line")
		.style("stroke", "orange")
		.style("stroke-width", 2)
		.attr("x1", 0)
		.attr("x2", width)
		.attr("y1", 100)
		.attr("y2", 300)

	//private linear demand
	var mpb = chart.append("line")
		.style("stroke", "red")
		.style("stroke-width", 2)
		.attr("x1", 0)
		.attr("x2", width)
		.attr("y1", 100)
		.attr("y2", 300)

	//social linear demand
	var msb = chart.append("line")
		.style("stroke", "orange")
		.style("stroke-width", 2)
		.attr("x1", 0)
		.attr("x2", width)
		.attr("y1", 50)
		.attr("y2", 250)
		.attr("opacity",0)



	var result1 = checkLineIntersection(supply, msb)
	var result2 = checkLineIntersection(supply, mpb)
	console.log(result1)
	if (result1.onLine1 && result1.onLine2){
		var Q1 = chart.append("line")
			.style("stroke", "black")
			.style("stroke-width", 1)
			.style("stroke-dasharray", ("3,3"))
			.attr("x1", result2.x)
			.attr("x2", result2.x)
			.attr("y1",  result2.y)
			.attr("y2", height)


		var P1 = chart.append("line")
			.style("stroke", "black")
			.style("stroke-width", 1)
			.style("stroke-dasharray", ("3,3"))
			.attr("x1", 0)
			.attr("x2", result2.x)
			.attr("y1", result2.y)
			.attr("y2", result2.y)

	}

	if (result2.onLine1 && result2.onLine2){
		var Q2 = chart.append("line")
			.style("stroke", "black")
			.style("stroke-width", 1)
			.style("stroke-dasharray", ("3,3"))
			.attr("x1", result2.x)
			.attr("x2", result2.x)
			.attr("y1",  result2.y)
			.attr("y2", height)

		var P2 = chart.append("line")
			.style("stroke", "black")
			.style("stroke-width", 1)
			.style("stroke-dasharray", ("3,3"))
			.attr("x1", 0)
			.attr("x2", result2.x)
			.attr("y1", result2.y)
			.attr("y2", result2.y)
	}
	var Q1trans = chart.append("line")
			.attr("opactity", 0)
			.attr("x1", result1.x)
			.attr("x2", result1.x)
			.attr("y1",  result1.y)
			.attr("y2", height)	

	var result3 = checkLineIntersection(mpb, Q1trans)

	// var dwl = getPoint(mpb, result2.x, height)

	// var DWLlength = chart.append("line")
	// 	.style("stroke", "black")
	// 	.style("stroke-width", 1)
	// 	.style("stroke-dasharray", ("3,3"))
	// 	.attr("x1", result2.x)
	// 	.attr("x2", result2.x)
	// 	.attr("y1", height - dwl)
	// 	.attr("y2", result2.y)

	var path = "M " + result1.x + " " + result1.y 
			+ " L " + result2.x + " " + result2.y +
			" L " + result3.x + " " + result3.y
			+ " L " + result1.x + " " + result1.y

	var path0 ="M " + result2.x + " " + result2.y 
			+ " L " + result2.x + " " + result2.y +
			" L " + + result2.x + " " + result2.y
			+ " L " + result2.x + " " + result2.y

	var path1 = "M " + result1.x + " " + result1.y 
			+ " L " + result1.x + " " + result1.y +
			" L " + result1.x + " " + result1.y
			+ " L " + result1.x + " " + result1.y

	var DWL = chart.append("path")
		.attr("d",path0)
        .style(".stroke-width", 2)
        .style("stroke", "none")
        .style("fill", "purple")
        .style("opacity", ".5");


    var next = d3.select("#next")
    	.on("click", function(){
    		//add externality
			msbF
				.transition()
				 .attr("y1", 50)
				 .attr("y2", 250)
				 .duration(2000)

			msbText
				.transition()
				.style("opacity",1)
				.duration(2000)

			DWL
				.transition()
				.attr("d",path)
				.duration(2000)
			Q1
				.transition()
				.attr("x1", result1.x)
				.attr("x2", result1.x)
				.attr("y1",  result1.y)
				.attr("y2", height)
				.duration(2000)	
			P1
				.transition()
				.attr("x1", 0)
				.attr("x2", result1.x)
				.attr("y1", result1.y)
				.attr("y2", result1.y)	
				.duration(2000)

			next.on("click", function() {
				//add subsity
				mpb
					.transition()
					.attr("y1", 50)
					.attr("y2", 250)
					.duration(2000)

				mpbText
					.transition()
					.style("opacity", 0)
					.duration(2000)
				DWL
					.transition()
					.attr("d",path1)
					.duration(2000)
				Q2
					.transition()
					.attr("x1", result1.x)
					.attr("x2", result1.x)
					.attr("y1",  result1.y)
					.attr("y2", height)	
					.duration(2000)
				P2
					.transition()
					.attr("x1", 0)
					.attr("x2", result1.x)
					.attr("y1", result1.y)
					.attr("y2", result1.y)	
					.duration(2000)
			})

    	})


/*var sampleSVG = d3.select("#viz")
        .append("svg")
        .attr("width", 300)
        .attr("height", 300);    

    sampleSVG.append("line")
        .style("stroke", "gray")
        .style("fill", "black")
        .style("stroke-width", 2)
        .attr("x1", 0)
        .attr("x2", 50)
        .attr("y1", 300)
        .attr("y2", 50)
        .on("mouseover", function(){d3.select(this).style("stroke", "steelblue");})
        .on("mouseout", function(){d3.select(this).style("stroke", "gray");});
*/
    })

/*function getIntersecrtion(firstx1, firsty1, firstx2, firsty2, secondx1, secondy1, secondx2, secondy2){
	a = (firsty1 - firsty2)/ (firstx1 - firstx2)
	b = (secondy1 - secondy2)/ (secondx1 - secondx2)

	if (a == b ){
		return null
	}


}*/

function checkLineIntersection(line1, line2) {
    // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
    line1StartX = +line1.attr("x1")
    line1StartY = +line1.attr("y1")
    line1EndX = +line1.attr("x2")
    line1EndY = +line1.attr("y2")
    line2StartX = +line2.attr("x1")
    line2StartY = +line2.attr("y1")
    line2EndX = +line2.attr("x2")
    line2EndY = +line2.attr("y2")


    var denominator, a, b, numerator1, numerator2, result = {
        x: null,
        y: null,
        onLine1: false,
        onLine2: false
    };
    denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
    if (denominator == 0) {
        return result;
    }
    a = line1StartY - line2StartY;
    b = line1StartX - line2StartX;
    numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
    numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    // if we cast these lines infinitely in both directions, they intersect here:
    result.x = line1StartX + (a * (line1EndX - line1StartX));
    result.y = line1StartY + (a * (line1EndY - line1StartY));
/*
        // it is worth noting that this should be the same as:
        x = line2StartX + (b * (line2EndX - line2StartX));
        y = line2StartX + (b * (line2EndY - line2StartY));
        */
    // if line1 is a segment and line2 is infinite, they intersect if:
    if (a > 0 && a < 1) {
        result.onLine1 = true;
    }
    // if line2 is a segment and line1 is infinite, they intersect if:
    if (b > 0 && b < 1) {
        result.onLine2 = true;
    }
    // if line1 and line2 are segments, they intersect if both of the above are true
    return result;
};

function getPoint(line, xcoord, height){
	startX = +line.attr("x1")
    startY = height - +line.attr("y1")
    endX = +line.attr("x2")
    endY = height - +line.attr("y2")

    if (startX > xcoord || endX < xcoord){
    	return null
    }

    else{
    	b = (startY - endY)/(startX - endX)
    	return (xcoord - startX)* b + startY
    }
}


