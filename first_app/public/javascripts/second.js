//second.js 

$(document).ready(function(){
	var state = 0
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
	var chart = d3.select(".chart")
		.attr({"display": "inline-block"}) 
		.append("svg")
		.attr({"display": "inline-block"})
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  	/*d3.select(".chart").append("div")
  		.attr({"id": "description", "display":"inline-block", "float": "right"})*/
  	d3.select("#description")
  		.html("Before Externality is Added")
  	chart.append("g")
      	.attr("class", "x axis")
      	.attr("transform", "translate(0," + height + ")")
      	.call(xAxis);
    chart.append("text")
    	.attr("class", "x label")
   		.attr("text-anchor", "end")
    	.attr("x", width)
    	.attr("y", height + margin.top)
    	.text("Quantity")
    chart.append("text")
    	.attr("class", "y label")
    	.attr("text-anchor", "end")
    	.attr("y", -10)
    	.attr("x", 0)
    	.attr("transform", "rotate(-90)")
    	.text("Price")
    chart.append("text")
    	.attr("id", "title")
    	.attr("text-anchor", "end")
    	.attr("x", (width + margin.left + margin.right)/2 + 80)
    	.attr("y", 10)
    	.text("Negative Externality Animation")
  	chart.append("g")
      	.attr("class", "y axis")
      	.call(yAxis);
//private linear supply curve
	var mpc = chart.append("line")
		.style("stroke", "blue")
		.style("stroke-width", 2)
		.attr("x1", 0)
		.attr("x2", width)
		.attr("y1", 300)
		.attr("y2", 100)

	var ppath = "M " + (width - 130) + " " + (height - getPoint(mpc,width-130, height) -4)
				+ " L " + (width-1) + " " + (height - getPoint(mpc, width-1 , height) -4)
	var mpcpath = chart.append("path")
		.attr("id", "path")
		.attr("d", ppath)

	var mpclabel = chart.append("text")
		.attr({'class':'edgelabel',
               'id': "mpclabel",
               /*'dx': width - 100,
               'dy':height - getPoint(mpc,width-100, height),*/
               'font-size':10,
               'fill':'blue'})
	  	.append("textPath")
			.attr("xlink:href", "#path")
			.style("pointer-events", "none")
			.text("Marginal Private Cost/Supply");
//social linear supply curve
/*	var msc = chart.append("line")
		.style("stroke", "steelblue")
		.style("stroke-width", 2)
		.attr("x1", 0)
		.attr("x2", width)
		.attr("y1", 250)
		.attr("y2", 50)

	var spath = "M " + (width - 100) + " " + (height - getPoint(msc,width-100, height) -4)
				+ " L " + (width-1) + " " + (height - getPoint(msc, width-1 , height) -4)
	var mscpath = chart.append("path")
		.attr("id", "spath")
		.attr("d", spath)

	var msclabel = chart.append("text")
		.attr({'class':'edgelabel',
               'id': "mpclabel",
               'font-size':10,
               'fill':'steelblue'})
	  	.append("textPath")
			.attr("xlink:href", "#spath")
			.style("pointer-events", "none")
			.text("Marginal Social Cost");*/

//total linear demand curve
	var demand = chart.append("line")
		.style("stroke", "red")
		.style("stroke-width", 2)
		.attr("x1", 0)
		.attr("x2", width)
		.attr("y1", 100)
		.attr("y2", 300)

	var dpath = "M " + (width - 115) + " " + (height - getPoint(demand,width-115, height) -4)
				+ " L " + (width-1) + " " + (height - getPoint(demand, width-1 , height) -4)
	var demandpath = chart.append("path")
		.attr("id", "dpath")
		.attr("d", dpath)

	var dlabel = chart.append("text")
		.attr({'class':'edgelabel',
               'id': "dlabel",
               /*'dx': width - 100,
               'dy':height - getPoint(mpc,width-100, height),*/
               'font-size':10,
               'fill':'red'})
	  	.append("textPath")
			.attr("xlink:href", "#dpath")
			.style("pointer-events", "none")
			.text("Marginal Benefit/Demand");

/*	var result1 = checkLineIntersection(msc, demand)
	console.log(result1)
	if (result1.onLine1 && result1.onLine2){
		var Q1 = chart.append("line")
			.style("stroke", "black")
			.style("stroke-width", 1)
			.style("stroke-dasharray", ("3,3"))
			.attr("x1", result1.x)
			.attr("x2", result1.x)
			.attr("y1", result1.y)
			.attr("y2", height)

		var P1 = chart.append("line")
			.style("stroke", "black")
			.style("stroke-width", 1)
			.style("stroke-dasharray", ("3,3"))
			.attr("x1", 0)
			.attr("x2", result1.x)
			.attr("y1",  result1.y)
			.attr("y2",  result1.y)
	}*/

		var result2 = checkLineIntersection(mpc, demand)
	 	console.log(result2)
	if (result2.onLine1 && result2.onLine2){

		var q2d1 = "M " + result2.x + " " + result2.y + " L " + result2.x + " " + height
		var Q2 = chart.append("path")
			.attr({"id": "q2path"})
			.attr("d", "M " + result2.x + " " + result2.y + " L " + result2.x + " " + height)
			.style("stroke", "black")
			.style("stroke-width", 1)
			
		var totalLength = Q2.node().getTotalLength();
		console.log(totalLength)

		Q2
  			.attr("stroke-dasharray", totalLength + " " + totalLength)
  			.attr("stroke-dashoffset", totalLength)
  				.transition()
    				.duration(1000)
    				.ease("linear")
    				.attr("stroke-dashoffset", 0);

    	var q2label = chart.append("text")
    		.attr({'class':'edgelabel',
               'id': "q2label",
               'dx': result2.x - 5,
               'dy':height + 15,
               'font-size':10,
               'fill':'black'})
    		.transition()
    			.delay(1000)
    		.text("Q*")


/*		var P2 = chart.append("line")
			.style("stroke", "black")
			.style("stroke-width", 1)
			.style("stroke-dasharray", ("3,3"))
			.attr("x1", 0)
			.attr("x2", result2.x)
			.attr("y1", result2.y)
			.attr("y2", result2.y)*/

		var P2 = chart.append("path")
			.attr("d", "M " + result2.x + " " + result2.y + " L " + 0 + " " + result2.y)
			.style("stroke", "black")
			.style("stroke-width", 1)
			
		var totalLength = P2.node().getTotalLength();
		console.log(totalLength)

		P2
  			.attr("stroke-dasharray", totalLength + " " + totalLength)
  			.attr("stroke-dashoffset", totalLength)
  				.transition()
    				.duration(1000)
    				.ease("linear")
    				.attr("stroke-dashoffset", 0);

    	var p2label = chart.append("text")
    		.attr({'class':'edgelabel',
               'id': "p2label",
               'dx': 0 - 18,
               'dy':result2.y + 5,
               'font-size':10,
               'fill':'black'})
    		.transition()
    			.delay(1000)
    		.text("P*")
	}
	dwlarea = 0
	var dwllabel =chart.append("text")
		.html("Dead Weight Loss= " + dwlarea)
		.style("fill", "purple")
		.attr("dx", 90)
		.attr("dy", 130)
		.attr({"font-size": 12})


//Start Animation Code

	var next = d3.select("#next")
		.on("click", function(){
		if (state == 0){
		state +=1
		d3.select("#description")
			.html("Adding a Constant Negative Externality")

		var msc = chart.append("line")
			.style("stroke", "orange")
			.style("stroke-width", 2)
			.attr("x1", 0)
			.attr("x2", width)
			.attr("y1", 250)
			.attr("y2", 50)
	var spath = "M " + (width - 100) + " " + (height - getPoint(msc,width-100, height) -4)
				+ " L " + (width-1) + " " + (height - getPoint(msc, width-1 , height) -4)
	var mscpath = chart.append("path")
		.attr("id", "spath")
		.attr("d", spath)
	var result1 = checkLineIntersection(msc, demand)
	console.log(result1)

	var dwl = getPoint(msc, result2.x, height)

	var msclabel = chart.append("text")
		.attr({'class':'edgelabel',
               'id': "mpclabel",
               'font-size':10,
               'fill':'orange'})
	  	.append("textPath")
			.attr("xlink:href", "#spath")
			.style("pointer-events", "none")
			.text("Marginal Social Cost");
	msc.attr("y1", 300)
		.attr("y2", 100)

	msc.transition()
		.duration(3000)
		.attr("y1", 250)
		.attr("y2", 50)



	P2.transition()
		.duration(3000)
		.attr("d", "M "+ result1.x + " " + result1.y + " L 0"+ " "+ result1.y)

	d3.select("#q2path").remove()
	var Q2 = chart.append("line")
		.style("stroke", "black")
		.style("stroke-width", 1)
		.attr("x1", result2.x)
		.attr("x2", result2.x)
		.attr("y1",  result2.y)
		.attr("y2", height)
		.transition()
			.duration(3000)
			.attr("x1", result1.x)
			.attr("x2", result1.x)
			.attr("y1", result1.y)
/*	var q2d2 = "M "+ result1.x + " " + result1.y + " L "+ result1.x + " "+ (height + margin.top)
	Q2.transition()
		.duration(3000)
		.attrTween("d", q2tween(q2d2, 4))*/
	q2label.transition()
		.delay(1750)
		.duration(3000)
		.attr("dx", result1.x -5)

	p2label.transition()
		.delay(1750)
		.duration(3000)
		.attr("dy", result1.y + 5)

	var DWLlength = chart.append("line")
		.style("stroke", "black")
		.style("stroke-width", 1)
		.style("stroke-dasharray", ("3,3"))
		.attr("x1", result2.x)
		.attr("x2", result2.x)
		.attr("y1", result2.y)
		.attr("y2", result2.y)
		.transition()
			.duration(3000)
			.attr("y1", height - dwl)

	var dwlpath0 = "M " + result2.x + " " + result2.y +
			" L " + result2.x + " " + result2.y +
			" L " + result2.x + " " + result2.y +
			" L " + result2.x + " " + result2.y 
	var dwlpath1 = "M " + result2.x + " " + result2.y 
			+ " L " + result1.x + " " + result1.y +
			" L " + result2.x + " " + (height - dwl)
			+ " L " + result2.x + " " + result2.y

	var changelabel =chart.append("text")
		.html("Increasing")
		.style("fill", "purple")
		.attr("dx", 130)
		.attr("dy", 150)
		.attr({"font-size": 10})

	var DWL = chart.append("path")
		.attr("d",dwlpath0)
		.attr({"id": "dwlpath"})
        .style(".stroke-width", 2)
        .style("stroke", "none")
        .style("fill", "purple")
        .style("opacity", ".5")
        .transition()
        	.duration(3000)
        	.attrTween("d", dwltween(dwlpath1, 4, dwlarea))

    	var Q1 = chart.append("line")
			.style("stroke", "black")
			.style("stroke-width", 1)
			.style("stroke-dasharray", ("3,3"))
			.attr("x1", result2.x)
			.attr("x2", result2.x)
			.attr("y1", result2.y)
			.attr("y2", height)

		var P1 = chart.append("line")
			.style("stroke", "black")
			.style("stroke-width", 1)
			.style("stroke-dasharray", ("3,3"))
			.attr("x1", 0)
			.attr("x2", result2.x)
			.attr("y1",  result2.y)
			.attr("y2",  result2.y)

		var q1label = chart.append("text")
    		.attr({'class':'edgelabel',
               'id': "q1label",
               'dx': result2.x - 5,
               'dy':height + 15,
               'font-size':10,
               'fill':'black'})
    		.transition()
    			.delay(1000)
    		.text("Qm")
    		

    	var p1label = chart.append("text")
    		.attr({'class':'edgelabel',
               'id': "p1label",
               'dx': 0- 20,
               'dy':result2.y + 5,
               'font-size':10,
               'fill':'black'})
    		.transition()
    			.delay(1000)
    		.text("Pm")

    next.on("click", function(){
    	if (state == 1){
    		state += 1
    		d3.select("#description")
    			.html("Adding a Constant Tax on Consumption")
    		changelabel.text("Decreasing")

    	mpc.transition()
    		.duration(3000)
    		.attr("y1", 250)
    		.attr("y2", 50)

    	var dwlpath2 = "M " + result1.x + " " + result1.y +
			" L " + result1.x + " " + result1.y +
			" L " + result1.x + " " + result1.y +
			" L " + result1.x + " " + result1.y 
		console.log(dwlpath2)

    	d3.select("#dwlpath")
    		.transition()
    			.duration(3000)
    			.attrTween("d", dwltween(dwlpath2, 4, dwlarea))
    	
    	Q1.transition()
    		.duration(3000)
    		.attr("x1", result1.x)
    		.attr("x2", result1.x)
    		.attr("y1", result1.y)
    	P1.transition()
    		.duration(3000)
    		.attr("y1", result1.y)
    		.attr("y2", result1.y)
    		.attr("x2", result1.x)

    	d3.select("#q1label")
    		.remove()
    	d3.select("#p1label")
    		.remove()

    	var ppath2 = "M " + (width - 130) + " " + (height - getPoint(msc,width-130, height) +15)
				+ " L " + (width-1) + " " + (height - getPoint(msc, width-1 , height) +15)
		/*var ppath2 = "M 0 0 L 100 300"*/
    	d3.select("#path")
    		.transition()
    			.duration(3000)
    			.attr("d", ppath2)

    	d3.select("#mpclabel")
    		.transition()
    			.duration(3000)
    			.attrTween("xlink:href", function() { return function() { return "#path"; }; });


    }
    })
    }
})
	

	function q2tween(d1, precision){
		return function() {
		var path0 = this,
			path1 = path0.cloneNode(),
			n0 = path0.getTotalLength(),
        	n1 = (path1.setAttribute("d", d1), path1).getTotalLength();
		 // Uniform sampling of distance based on specified precision.
    	var distances = [0], i = 0, dt = precision / Math.max(n0, n1);
    	while ((i += dt) < 1) distances.push(i);
    	distances.push(1);

    	// Compute point-interpolators at each distance.
    	var points = distances.map(function(t) {
      	var p0 = path0.getPointAtLength(t * n0),
        	p1 = path1.getPointAtLength(t * n1);
        	/*console.log(p0)
        	console.log(p1)
        	console.log(d3.interpolate([p0.x, p0.y], [p1.x, p1.y]))*/
     	return d3.interpolate([p0.x, p0.y], [p1.x, p1.y]);
    });

    	return function(t) {
      		return t < 1 ? "M" + points.map(function(p) { return p(t); }).join("L") : d1;
    };
	}}

	function dwltween(d1, precision, dwlarea){
		return function() {
		var path0 = this,
			path1 = path0.cloneNode(),
			n0 = path0.getTotalLength(),
        	n1 = (path1.setAttribute("d", d1), path1).getTotalLength();
		 // Uniform sampling of distance based on specified precision.
    	var distances = [0], i = 0, dt = precision / Math.max(n0, n1);
    	while ((i += dt) < 1) distances.push(i);
    	distances.push(1);

    	// Compute point-interpolators at each distance.
    	var points = distances.map(function(t) {
      	var p0 = path0.getPointAtLength(t * n0),
        	p1 = path1.getPointAtLength(t * n1);
        	/*console.log(p0)
        	console.log(p1)
        	console.log(d3.interpolate([p0.x, p0.y], [p1.x, p1.y]))*/
     	return d3.interpolate([p0.x, p0.y], [p1.x, p1.y]);
    });

    	return function(t) {
    		var w = document.getElementById("dwlpath").getBoundingClientRect().width
			var h = document.getElementById("dwlpath").getBoundingClientRect().height
			dwlarea = w*h/2
			dwllabel.text("Dead Weight Loss = "+ String(dwlarea/1298 * 100).split(".")[0])
      		return t < 1 ? "M" + points.map(function(p) { return p(t); }).join("L") : d1;
    };
	}}	

	})


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


