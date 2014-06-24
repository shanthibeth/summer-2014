//externality.js

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
		.attr("id","svg")
		.attr({"display": "inline-block"})
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
			.attr({"id": "chart"})
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
  	chart.append("g")
      	.attr("class", "y axis")
      	.call(yAxis);
//private linear supply curve
	var mpc = chart.append("line")
		.attr({"id": "mpc"})
		.style("stroke", "blue")
		.style("stroke-width", 2)
		.attr("x1", 0)
		.attr("x2", width)
		.attr("y1", 300)
		.attr("y2", 100)

	var ppath = "M " + (width - 105) + " " + (height - getPoint(mpc,width-105, height) -4)
				+ " L " + (width-1) + " " + (height - getPoint(mpc, width-1 , height) -4)
	var mpcpath = chart.append("path")
		.attr("id", "path")
		.attr("d", ppath)

	var mpclabel = chart.append("text")
		.attr({'class':'edgelabel',
               'id': "mpclabel",
               'font-size':10,
               'fill':'blue'})
	  	.append("textPath")
	  		.attr({"id": "mpclabelpath"})
			.attr("xlink:href", "#path")
			.style("pointer-events", "none")
			.text("Marginal Cost/Supply");

//total linear demand curve
	var demand = chart.append("line")
		.attr({"id": "demand"})
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
	  		.attr("id", "dpathlabel")
			.attr("xlink:href", "#dpath")
			.style("pointer-events", "none")
			.text("Marginal Benefit/Demand");

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
			.attr({"id": "P2"})
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
	$(".ebutton").hover(function(){
		$(this).addClass("hover")
	},function(){
		$(this).removeClass("hover")
	})
	d3.select("#description")
		.html("In a world without externalities, the price that a producer pays would entirely reflect all the costs that their production process generates. Similarly, the price that a consumer would pay would entirely reflect all the benefits that the consumer receives.But energy production, like many other goods and services, involves externalities. <b>Click on negative externality to begin.</b>")
	$("#negativebutton").click(function (){
	$(".button").addClass("unclick")
	$("#pause").addClass("unclick")
	d3.select("#chart").remove()
	$("#pause").removeClass("play")
	$("#pause").addClass("pause")
	negative()
	//$("#next").removeClass("unclick")
})
	$("#positivebutton").click(function (){
	$(".button").addClass("unclick")
	$("#pause").addClass("unclick")
	$("#next").removeClass("unclick")
	d3.select("#chart").remove()
	$("#pause").removeClass("play")
	$("#pause").addClass("pause")
	positive()
})
})

