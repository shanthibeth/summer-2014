//first.js


function positive(){

	var stage = 0
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
	var chart = d3.select("#svg")
	// var chart = d3.select(".chart")
	// 	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
			.attr({"id": "chart"})
  	chart.append("g")
      	.attr("class", "x axis")
      	.attr("transform", "translate(0," + height + ")")
      	.call(xAxis);

  	chart.append("g")
      	.attr("class", "y axis")
      	.call(yAxis);


    d3.select("#description")
  		.html("Energy can also involve positive externalities. Some have argued that renewable place-based energy sources, like wind and solar, may generate positive externalities that consumer’s aren’t paying for, like reduced defense budgets because the government doesn’t need to engage in efforts to secure foreign fossil fuel supplies.")
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
    	.text("Positive Externality Animation")
  	chart.append("g")
      	.attr("class", "y axis")
      	.call(yAxis);



//private linear supply curve
	//var supply = d3.select("#mpc")
	var supply = chart.append("line")
		.style("stroke", "blue")
		.style("stroke-width", 2)
		.attr("x1", 0)
		.attr("x2", width)
		.attr("y1", 300)
		.attr("y2", 100)
	
	var supplyPath = chart.append("path")
    	.attr("id", "path2")
    	.attr("d", "M 0,300 L 430,100");

	var supplyText = chart.append("text")
    	//.attr("x", 8)
    	.attr("dx", 370)
    	.attr("dy", -5)
    	.style("font-size", 10)
    	.attr("fill","blue")
  		.append("textPath")
    		.attr("class", "textpath")
    		.attr("xlink:href", "#path2")
    		.text("Marginal Cost/Supply");

	// var supplyPath = chart.append("path")
	// 	.attr("d", "M " + width-60 + " " + 290 + " L " + width + " " + 350 + " L " + width-60 + " " + 290)


	// var supplyLabel = chart.append("text")
	// 	.attr("x", width-60)
	// 	.attr("y", 290)
	// 	.append(supplyPath)
	// 		.text("Supply curve")


	var mpbPath = chart.append("path")
		.attr("id", "mpbpath")
   		.attr("d", "M 0,100 L 430,300");
	//var mpbText = d3.select("#dlabel")
	var mpbText = chart.append("text")
    	//.attr("x", 8)
    	.attr("dx", 360)
    	.attr("dy", -5)
    	.style("font-size", 10)
    	.attr("fill","red")
  		.append("textPath")
    		.attr("class", "textpath")
    		.attr("xlink:href", "#mpbpath")
    		.text("Marginal Private Benefit");
	
	// var mpbTextPath = d3.select("#dpathlabel")
	// 	.text("Marginal Private Benefit")

	var msbPath = chart.append("path")
    	.attr("id", "path1")
    	.attr("d", "M 0,50 L 430,250");
    var mpb = d3.select("#demand")


	var msbF = chart.append("line")
		.style("stroke", "orange")
		.style("stroke-width", 2)
		.attr("x1", 0)
		.attr("x2", width)
		.attr("y1", 100)
		.attr("y2", 300)
		.attr("opacity", 0)

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
		var Q1 = d3.select("#Q2")
		var P1 = d3.select("#P2")
		var Q1 = chart.append("line")
		 	.style("stroke", "black")
		 	.style("stroke-width", 1)
		 	.attr("id", "Q1")
		 	//.style("stroke-dasharray", ("3,3"))
		 	.attr("x1", result2.x)
		 	.attr("x2", result2.x)
		 	.attr("y1",  result2.y)
		 	.attr("y2", result2.y)
		 	.transition()
		 	.attr("y2",height)
		 	.duration(1000)


		var P1 = chart.append("line")
			.style("stroke", "black")
			.style("stroke-width", 1)
			.attr("id", "P1")
			//.style("stroke-dasharray", ("3,3"))
			.attr("x1", result2.x)
			.attr("x2", result2.x)
			.attr("y1", result2.y)
			.attr("y2", result2.y)
			.transition()
		 	.attr("x1",0)
		 	.duration(1000)



	}

	if (result2.onLine1 && result2.onLine2){
		var Q2 = chart.append("line")
			.attr("id", "Q1")
			.style("stroke", "black")
			.style("stroke-width", 1)
			.style("stroke-dasharray", ("3,3"))
			.attr("x1", result2.x)
			.attr("x2", result2.x)
			.attr("y1",  result2.y)
			.attr("y2", height)
			.attr("opacity",0)

		var P2 = chart.append("line")
			.style("stroke", "black")
			.style("stroke-width", 1)
			.style("stroke-dasharray", ("3,3"))
			.attr("x1", 0)
			.attr("x2", result2.x)
			.attr("y1", result2.y)
			.attr("y2", result2.y)
			.attr("opacity",0)
	}



   var q1explanation = d3.tip()
  		.attr("class", "hoverbox")
		.offset([-10, 0])
		.html("explanation of the label blah<br> blah blah blah blah blah blah blah")
 

  	chart.call(q1explanation)

		var q1label = d3.select("#q2label")
		var p1label = d3.select("#p2label")
		var q1label = chart.append("text")
    		.attr({'class':'edgelabel',
               'id': "q1label",
               'dx': result2.x - 5,
               'dy':height + 15,
               'font-size':10,
               'fill':'black'})
    		.text("Q*")
    		.on('mouseover', q1explanation.show)
      		.on('mouseout', q1explanation.hide)
      		.transition()
    			.delay(1000)

    	var p1label = chart.append("text")
    		.attr({'class':'edgelabel',
               'id': "p1label",
               'dx': 0- 20,
               'dy':result2.y + 5,
               'font-size':10,
               'fill':'black'})
    		.transition()
    			.delay(1000)
    		.text("P*")
    		//.on('mouseover', tip.show())
    		//.on('mouseout', tip.hide())

	    	var p1explanationback = chart.append("rect")
	    		.attr("x", 0)
	    		.attr("y", result2.y-15)
	    		.attr("width", 100)
	    		.attr("height", 30)
	    		.attr("fill", "black")
	    		.attr("opacity", .8)
	    		.style("visibility", "hidden")

	    	var p1explanation = chart.append("text")
	    		.attr("id", "p1explanation")
	    		//.attr("class", "hoverbox hidden")
	    		.style("visibility", "hidden")
	    		.attr("font-size", 10)
	    		.attr("width", 50)
	    		.attr("height", 100)
	    		//.attr("backgroundColor","black")
	    		.attr("dx", 0)
	    		.attr("dy", result2.y-15)
	    		//.attr("dx", 0)
	    		//.attr("dy", 0)
	    		.style("fill", "green")
	    		.html("explanation of the label<br> blah blah blah blah blah blah blah blah")

    	d3.select("#p1label")
			.on("mouseover", function(){ p1explanation.style("visibility", "visible") 
										p1explanationback.style("visibility", "visible");})
			.on("mouseout", function(){ p1explanation.style("visibility", "hidden") 
										p1explanationback.style("visibility", "hidden");});
    	


  /*

	svg.call(tip);

	svg.selectAll("p1label")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.letter); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.frequency); })
      .attr("height", function(d) { return height - y(d.frequency); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

      */

    		

	var Q1trans = chart.append("line")
			.attr("opactity", 0)
			.attr("x1", result1.x)
			.attr("x2", result1.x)
			.attr("y1",  result1.y)
			.attr("y2", height)	

	var result3 = checkLineIntersection(mpb, Q1trans)

	var dwl = getPoint(mpb, result2.x, height)

	var DWLlength = chart.append("line")
		.style("stroke", "black")
		.style("stroke-width", 1)
		.style("stroke-dasharray", ("3,3"))
		.attr("x1", result2.x)
		.attr("x2", result2.x)
		.attr("y1", height - dwl)
		.attr("y2", result2.y)

	var dwlpath = "M " + result1.x + " " + result1.y 
			+ " L " + result2.x + " " + result2.y +
			" L " + result3.x + " " + result3.y
			+ " L " + result1.x + " " + result1.y

	var dwlpath0 ="M " + result2.x + " " + result2.y 
			+ " L " + result2.x + " " + result2.y +
			" L " + + result2.x + " " + result2.y
			+ " L " + result2.x + " " + result2.y

	var dwlpath1 = "M " + result1.x + " " + result1.y 
			+ " L " + result1.x + " " + result1.y +
			" L " + result1.x + " " + result1.y
			+ " L " + result1.x + " " + result1.y



   	dwlarea = 0
	var dwllabel =chart.append("text")
		.html("Dead Weight Loss= " + dwlarea)
		.style("fill", "purple")
		.attr("dx", 180)
		.attr("dy", 100)
		.attr({"font-size": 12})

	var DWL = chart.append("path")
		.attr("id", "dwlpath")
		.attr("d",dwlpath0)
        .style(".stroke-width", 2)
        .style("stroke", "none")
        .style("fill", "purple")
        .style("opacity", ".5")
        //.transition()
        //	.duration(3000)
        //	.attrTween("d", dwltween(dwlpath, 4, dwlarea))
    var timeout
    var timeout2
    var timeout3

    var next = d3.select("#next")
    	.on("click", function(){
    		if (!($(this).hasClass("unclick"))){
    		$(".button").addClass("unclick")
    		$("#pause").removeClass("unclick")
    			timeout = setTimeout(function(){
    				$(".button").removeClass("unclick")
    				$("#pause").addClass("unclick")
    			}, 3000)

    		if (stage == 0){
    			timeout2 = setTimeout(function(){
    				$("#prev").removeClass("unclick")
    			}, 3000)
    			stage0f()
    		}
    		//add externality
 
    		else if (stage == 1){
    			timeout2 = setTimeout(function(){
    				$("#next").addClass("unclick")
    			}, 3000)
    			stage1f()
    		}
    	}

			// next.on("click", function() {
			// 	//add subsity
				
			// 	var DWLline = chart.append("line")
			// 		.style("stroke", "black")
			// 		.style("stroke-width", 1)
			// 		.style("stroke-dasharray", ("3,3"))
			// 		.attr("x1", 0)
			// 		.attr("x2", result2.x)
			// 		.attr("y1", result2.y)
			// 		.attr("y2", result2.y)
			// 		.transition()
			// 			.attr("x1", 0)
			// 			.attr("x2", result1.x)
			// 			.attr("y1", result1.y)
			// 			.attr("y2", result1.y)	
			// 			.duration(3000)

				
			// })

    	})

    var prev = d3.select("#prev")
    	.on("click", function(){
    		if (!($(this).hasClass("unclick"))){
    		$(".button").addClass("unclick")
    		$("#pause").removeClass("unclick")
    			timeout = setTimeout(function(){
    				$(".button").removeClass("unclick")
    				$("#pause").addClass("unclick")
    			}, 3000)
    		if (stage == 1){
    			stage1b()
    			timeout2 = setTimeout(function(){
    				$("#prev").addClass("unclick")
    			}, 3000)
    			
    			
    		}
    		else if (stage ==2){
    			timeout2 = setTimeout(function(){
    				$("#next").removeClass("unclick")
    			}, 3000)
    			stage2b()
    		}
    	}
    	})
    	var pause = d3.select("#pause")
		.on("click", function(){
			if (!($(this).hasClass("unclick"))){
    		$(".button").addClass("unclick")
    		if ($(this).hasClass("pause")){
    			clearTimeout(timeout)
    			clearTimeout(timeout2)
    			clearTimeout(timeout3)
    		}
			if (stage == 1 && direction == "forward"){
				if ($(this).hasClass("pause")){
					$(this).removeClass("pause")
					$(this).addClass("play")
					stage0fpause()

			}
			else{
				$(this).removeClass("play")
				$(this).addClass("pause")
				stage0fplay()
			}
			}
			else if (stage == 0 && direction == "backward"){
				if ($(this).hasClass("pause")){
					$(this).removeClass("pause")
					$(this).addClass("play")
					stage0bpause()

			}
			else{
				$(this).removeClass("play")
				$(this).addClass("pause")
				console.log("working")
				stage0bplay()
			}
		}
			else if( stage == 2 && direction == "forward"){
				if ($(this).hasClass("pause")){
					$(this).removeClass("pause")
					$(this).addClass("play")
					stage2fpause()

			}
			else{
				$(this).removeClass("play")
				$(this).addClass("pause")
				console.log("working")
				stage2fplay()
			}
			}
			else if (stage ==1 && direction == "backward"){
				if ($(this).hasClass("pause")){
					$(this).removeClass("pause")
					$(this).addClass("play")
					stage1bpause()

			}
			else{
				$(this).removeClass("play")
				$(this).addClass("pause")
				console.log("working")
				stage1bplay()
			}
			}}
		})

	function stage0f(){
			direction = "forward"
			stage += 1
		   	d3.select("#description")
				.html("Here, the marginal social benefit is higher than the private benefit, and as a result, consumers underpurchase the good, again creating a deadweight loss to society represented by the triangle.")

			var changelabel =chart.append("text")
				.attr({"id":"changelabel"})
				.html("Increasing")
				.style("fill", "purple")
				.attr("dx", 230)
				.attr("dy", 120)
				.attr({"font-size": 10})

			msbF
				.attr("T", 0)
				.attr("opacity", 1)
				.transition()
				 .attr("y1", 50)
				 .attr("y2", 250)
				 .attr("T", 1)
				 .duration(3000)

			var msbText = chart.append("text")
		    	//.attr("x", 8)
		    	.attr("id", "msbText")
		    	.attr("dx", 355)
		    	.attr("dy", -5)
		    	.style("font-size", 10)
		    	.attr("fill","orange")
		  		.append("textPath")
		    		.attr("class", "textpath")
		    		.attr("xlink:href", "#path1")
		    		.text("Marginal Social Benefit");

			DWL
				.transition()
				.attrTween("d",dwltween(dwlpath, 4, dwlarea))
				.duration(3000)

			P1
				.transition()
				.attr("opacity",0)

			Q1
				.transition()
				.attr("opacity",0)

		var q1label = d3.select("#q1label")
			.transition()
			.attr("dx", result1.x-5)
			.duration(3000)

		var p1label = d3.select("#p1label")
			.transition()
			.attr("dy", result1.y+5)
			.duration(3000)


		var Q12 = chart.append("line")
		 .style("stroke", "black")
		 	.attr("id", "Q12")
		 	.style("stroke-width", 1)
		 	//.style("stroke-dasharray", ("3,3"))
		 	.attr("x1", result2.x)
		 	.attr("x2", result2.x)
		 	.attr("y1",  result2.y)
		 	.attr("y2", height)
		 	.transition()
				.attr("x1", result1.x)
				.attr("x2", result1.x)
				.attr("y1",  result1.y)
				.attr("y2", height)
				.duration(3000)	


		var P12 = chart.append("line")
			.attr("id", "P12")
			.style("stroke", "black")
			.style("stroke-width", 1)
			//.style("stroke-dasharray", ("3,3"))
			.attr("x1", 0)
			.attr("x2", result2.x)
			.attr("y1", result2.y)
			.attr("y2", result2.y)
			.transition()
				.attr("x1", 0)
				.attr("x2", result1.x)
				.attr("y1", result1.y)
				.attr("y2", result1.y)	
				.duration(3000)

		var q2label = chart.append("text")
    		.attr({'class':'edgelabel',
               'id': "q2label",
               'dx': result2.x - 5,
               'dy':height + 15,
               'font-size':10,
               'fill':'black'})
    		.transition()
    			.delay(1000)
    		.text("Qm")

/*    		var q2explanationback = chart.append("rect")
	    		.attr("x", result2.x-50)
	    		.attr("y", height-25)
	    		.attr("width", 100)
	    		.attr("height", 30)
	    		.attr("fill", "black")
	    		.attr("opacity", .8)
	    		.style("visibility", "hidden")

	    	var q2explanation = chart.append("text")
	    		.attr("id", "q2explanation")
	    		//.attr("class", "hoverbox hidden")
	    		.style("visibility", "hidden")
	    		.attr("font-size", 10)
	    		.attr("width", 50)
	    		.attr("height", 100)
	    		//.attr("backgroundColor","black")
	    		.attr("dx", result2.x-50)
	    		.attr("dy", height-25)
	    		//.attr("dx", 0)
	    		//.attr("dy", 0)
	    		.style("fill", "green")
	    		.html("explanation of the label<br> blah blah blah blah blah blah blah blah")

    	d3.select("#q2label")
			.on("mouseover", function(){ q2explanation.style("visibility", "visible") 
										q2explanationback.style("visibility", "visible");})
			.on("mouseout", function(){ q2explanation.style("visibility", "hidden") 
										q2explanationback.style("visibility", "hidden");});*/

    	var p2label = chart.append("text")
    		.attr({'class':'edgelabel',
               'id': "p2label",
               'dx': 0 - 20,
               'dy':result2.y + 5,
               'font-size':10,
               'fill':'black'})
    		.transition()
    			.delay(1000)
    		.text("Pm")

    	var p2explanationback = chart.append("rect")
	    		.attr("x", 0)
	    		.attr("y", result2.y-15)
	    		.attr("width", 100)
	    		.attr("height", 30)
	    		.attr("fill", "black")
	    		.attr("opacity", .8)
	    		.style("visibility", "hidden")

	    	var p2explanation = chart.append("text")
	    		.attr("id", "p2explanation")
	    		//.attr("class", "hoverbox hidden")
	    		.style("visibility", "hidden")
	    		.attr("font-size", 10)
	    		.attr("width", 50)
	    		.attr("height", 100)
	    		//.attr("backgroundColor","black")
	    		.attr("dx", 0)
	    		.attr("dy", result2.y-15)
	    		//.attr("dx", 0)
	    		//.attr("dy", 0)
	    		.style("fill", "green")
	    		.html("explanation of the label<br> blah blah blah blah blah blah blah blah")

    	d3.select("#p2label")
			.on("mouseover", function(){ p2explanation.style("visibility", "visible") 
										p2explanationback.style("visibility", "visible");})
			.on("mouseout", function(){ p2explanation.style("visibility", "hidden") 
										p2explanationback.style("visibility", "hidden");});

			Q2
				.transition()
				.attr("opacity",1)

			P2
				.transition()
				.attr("opacity",1)
	}
	function stage0fpause(){
		msbF
			.transition()
			.duration(0)

		DWL
			.transition()
			.duration(0)

		var q1label = d3.select("#q1label")
			.transition()
			.duration(0)

		var p1label = d3.select("#p1label")
			.transition()
			.duration(0)


		var Q12 = d3.select("#Q12")
		 	.transition()
				.duration(0)	


		var P12 = d3.select("#P12")
			.transition()
				.duration(0)

		var q2label = d3.select("#q2label")
    		.transition()
    			.delay(0)

    	var p2label = d3.select("#p2label")
    		.transition()
    			.delay(0)

	}
	function stage0fplay(){
		console.log("play")
			var time = msbF.attr("T") *3000
			msbF
				.transition()
				 .attr("y1", 50)
				 .attr("y2", 250)
				 .attr("T", 1)
				 .duration(3000 - time)

			DWL
				.transition()
				.attrTween("d",dwltween(dwlpath, 4, dwlarea))
				.duration(3000 - time)

		var q1label = d3.select("#q1label")
			.transition()
			.attr("dx", result1.x-5)
			.duration(3000 - time)

		var p1label = d3.select("#p1label")
			.transition()
			.attr("dy", result1.y+5)
			.duration(3000 - time)


		var Q12 = d3.select("#Q12")
		 	.transition()
				.attr("x1", result1.x)
				.attr("x2", result1.x)
				.attr("y1",  result1.y)
				.attr("y2", height)
				.duration(3000 - time)	


		var P12 = d3.select("#P12")
			.transition()
				.attr("x1", 0)
				.attr("x2", result1.x)
				.attr("y1", result1.y)
				.attr("y2", result1.y)	
				.duration(3000 - time)

		if (1000 - time > 0){
		var q2label = d3.select("#q2label")
    		.transition()
    			.delay(1000 -time)
    		.text("Qm")

    	var p2label = d3.select("#p1label")
    		.transition()
    			.delay(1000 - time)
    		.text("Pm")
    	}
    	timeout3 = setTimeout(function(){
    				$(".button").removeClass("unclick")
    				$("#pause").addClass("unclick")
    			}, 3000 -time)

	}
	function stage1b(){
		direction = "backward"
		stage -= 1
	   	d3.select("#description")
			.html("Energy can also involve positive externalities. Some have argued that renewable place-based energy sources, like wind and solar, may generate positive externalities that consumer’s aren’t paying for, like reduced defense budgets because the government doesn’t need to engage in efforts to secure foreign fossil fuel supplies.")
		var changelabel = d3.select("#changelabel")
			.html("Decreasing")
			.transition()
				.delay(3000)
			.remove()
		msbF
			.attr("T", 0)
			.transition()
			 .attr("y1", 100)
			 .attr("y2", 300)
			 .duration(3000)
			 .attr("T", 1)
		msbF
			.transition()
				.delay(3000)
			.attr("opacity", 0)
			
		d3.select("#msbText")
			.remove()
		DWL
			.transition()
			.attrTween("d",dwltween(dwlpath0, 4, dwlarea))
			.duration(3000)

		var P1 =d3.select("#P1")
			.transition()
				.delay(2900)
			.attr("opacity",1)

		var Q1 = d3.select("#Q1")
			.transition()
				.delay(2900)
			.attr("opacity",1)

		var q1label = d3.select("#q1label")
			.transition()
				.attr("dx", result2.x-5)
				.duration(3000)

		var p1label = d3.select("#p1label")
			.transition()
				.attr("dy", result2.y+5)
				.duration(3000)
		var Q12 = d3.select("#Q12")
			.transition()
				.duration(3000)
				.attr("x1", result2.x)
				.attr("x2", result2.x)
				.attr("y2", height)
				.attr("y1", result2.y)
			.remove()
		var P12 = d3.select("#P12")
			.transition()
				.duration(3000)
				.attr("y1", result2.y)
				.attr("y2", result2.y)
				.attr("x2", result2.x)
			.remove()

		d3.select("#p2label")
			.transition()
				.delay(2000)
				.remove()
		d3.select("#q2label")
			.transition()
				.delay(2000)
				.remove()
		Q2
			.transition()
				.delay(3000)
			.attr("opacity", 0)
		P2
			.transition()
				.delay(3000)
			.attr("opacity", 0)

	}
	function stage0bpause(){
		var changelabel = d3.select("#changelabel")
			.transition()
				.duration(0)
		msbF
			.transition()
			 .duration(0)
		msbF
			.transition()
				.duration(0)
		DWL
			.transition()
			.duration(0)

		var P1 =d3.select("#P1")
			.transition()
				.delay(0)

		var Q1 = d3.select("#Q1")
			.transition()
				.delay(0)

		var q1label = d3.select("#q1label")
			.transition()
				.duration(0)

		var p1label = d3.select("#p1label")
			.transition()
				.duration(0)
		var Q12 = d3.select("#Q12")
			.transition()
				.duration(0)
		var P12 = d3.select("#P12")
			.transition()
				.duration(0)

		d3.select("#p2label")
			.transition()
				.duration(0)
		d3.select("#q2label")
			.transition()
				.duration(0)
		Q2
			.transition()
				.duration(0)
		P2
			.transition()
				.duration(0)
	}
	function stage0bplay(){
		var time = msbF.attr("T")* 3000
		var changelabel = d3.select("#changelabel")
			.transition()
				.delay(3000- time)
			.remove()
		msbF
			.transition()
			 .attr("y1", 100)
			 .attr("y2", 300)
			 .duration(3000 - time)
			 .attr("T", 1)
		msbF
			.transition()
				.delay(3000- time)
			.attr("opacity", 0)
		DWL
			.transition()
			.attrTween("d",dwltween(dwlpath0, 4, dwlarea))
			.duration(3000 - time)

		if (2900 - time > 0){
		var P1 =d3.select("#P1")
			.transition()
				.delay(2900 - time)
			.attr("opacity",1)

		var Q1 = d3.select("#Q1")
			.transition()
				.delay(2900 - time)
			.attr("opacity",1)}

		var q1label = d3.select("#q1label")
			.transition()
				.attr("dx", result2.x-5)
				.duration(3000- time)

		var p1label = d3.select("#p1label")
			.transition()
				.attr("dy", result2.y+5)
				.duration(3000 - time)
		var Q12 = d3.select("#Q12")
			.transition()
				.duration(3000 - time)
				.attr("x1", result2.x)
				.attr("x2", result2.x)
				.attr("y2", height)
				.attr("y1", result2.y)
			.remove()
		var P12 = d3.select("#P12")
			.transition()
				.duration(3000 - time)
				.attr("y1", result2.y)
				.attr("y2", result2.y)
				.attr("x2", result2.x)
			.remove()

		if (2000 -time > 0){
		d3.select("#p2label")
			.transition()
				.delay(2000- time)
				.remove()
		d3.select("#q2label")
			.transition()
				.delay(2000- time)
				.remove()
			}
		Q2
			.transition()
				.delay(3000-time)
			.attr("opacity", 0)
		P2
			.transition()
				.delay(3000-time)
			.attr("opacity", 0)
		timeout3 = setTimeout(function(){
    				$("#next").removeClass("unclick")
    				$("#pause").addClass("unclick")
    			}, 3000- time)
	}
	function stage1f(){
		direction = "forward"
		stage += 1
		//var q2label = d3.select("#q2label")
		//			.transition()
		//			.attr("opacity",0)
		d3.select("#q2label")
			.transition()
				.duration(3000)
				.attr("dx", result1.x)
		var p2label = d3.select("#p2label")
			.transition()
				.duration(3000)
				.attr("dy", result1.y)
		var p1label = d3.select("#p1label")
			.transition()
			.attr("opacity",0)
		var q1label = d3.select("#q1label")
			.transition()
			.attr("opacity",0)
		mpb
			.attr("T",0)
			.transition()
			.attr("y1", 50)
			.attr("y2", 250)
			.duration(3000)
			.attr("T", 1)

		mpbPath
			.transition()
			   	.attr("d", "M 0,64 L 430,264")
			   	.duration(3000)

		mpbText
			.transition()
			.attr("dx", 355)
    		.attr("dy", 5)
			//.style("opacity", 0)
			.duration(3000)
		DWL
			.transition()
			.attrTween("d",dwltween(dwlpath1, 4, dwlarea))
			.duration(3000)
		Q2
			.transition()
			.attr("x1", result1.x)
			.attr("x2", result1.x)
			.attr("y1",  result1.y)
			.attr("y2", height)	
			.duration(3000)
		Q2
			.transition()
			.delay(3000)
			.attr("opacity", 0)
		P2
			.transition()
			.attr("x1", 0)
			.attr("x2", result1.x)
			.attr("y1", result1.y)
			.attr("y2", result1.y)	
			.duration(3000)


		d3.select("#description")
			.html("By using subsidies so that households realize the full benefit of their consumption, governments can encourage more efficient consumption levels of goods with positive externalities.")
		var changelabel = d3.select("#changelabel")
			.html("Decreasing")
	}
	function stage2fpause(){
		d3.select("#q2label")
			.transition()
				.duration(0)
		var p2label = d3.select("#p2label")
			.transition()
				.duration(0)
		mpb
			.transition()
			.duration(0)

		mpbPath
			.transition()
			   	.duration(0)

		mpbText
			.transition()
			.duration(0)
		DWL
			.transition()
			.duration(0)
		Q2
			.transition()
			.duration(0)
		Q2
			.transition()
			.delay(0)
		P2
			.transition()	
			.duration(0)

	}
	function stage2fplay(){
		var time = mpb.attr("T")*3000
		d3.select("#q2label")
			.transition()
				.duration(3000 - time)
				.attr("dx", result1.x)
		var p2label = d3.select("#p2label")
			.transition()
				.duration(3000-time)
				.attr("dy", result1.y)
		mpb
			.transition()
			.attr("y1", 50)
			.attr("y2", 250)
			.duration(3000 - time)
			.attr("T", 1)

		mpbPath
			.transition()
			   	.attr("d", "M 0,64 L 430,264")
			   	.duration(3000 - time)

		mpbText
			.transition()
			.attr("dx", 355)
    		.attr("dy", 5)
			//.style("opacity", 0)
			.duration(3000 - time)
		DWL
			.transition()
			.attrTween("d",dwltween(dwlpath1, 4, dwlarea))
			.duration(3000 - time)
		Q2
			.transition()
			.attr("x1", result1.x)
			.attr("x2", result1.x)
			.attr("y1",  result1.y)
			.attr("y2", height)	
			.duration(3000 - time)
		Q2
			.transition()
			.delay(3000 - time)
			.attr("opacity", 0)
		P2
			.transition()
			.attr("x1", 0)
			.attr("x2", result1.x)
			.attr("y1", result1.y)
			.attr("y2", result1.y)	
			.duration(3000 - time)
		timeout3 = setTimeout(function(){
    				$("#prev").removeClass("unclick")
    				$("#pause").addClass("unclick")
    			}, 3000 -time)

	}
	function stage2b(){
		direction = "backward"
		d3.select("#description")
			.html("Here, the marginal social benefit is higher than the private benefit, and as a result, consumers underpurchase the good, again creating a deadweight loss to society represented by the triangle.")
		var changelabel = d3.select("#changelabel")
			.html("Increasing")
		stage -= 1
		d3.select("#q2label")
			.transition()
				.duration(3000)
				.attr("dx", result2.x -5)
		var p2label = d3.select("#p2label")
			.transition()
				.duration(3000)
				.attr("dy", result2.y +5)
		var p1label = d3.select("#p1label")
			.transition()
				.delay(1000)
			.attr("opacity",1)
		var q1label = d3.select("#q1label")
			.transition()
				.delay(1000)
			.attr("opacity",1)

		mpb
			.attr("T", 0)
			.transition()
			.attr("y1", 100)
			.attr("y2", 300)
			.attr("T",1)
			.duration(3000)

		mpbPath
			.transition()
			   	.attr("d", "M 0,100 L 430,300")
			   	.duration(3000)

		mpbText
			.transition()
			.attr("dx", 360)
    		.attr("dy", -5)
			//.style("opacity", 0)
			.duration(3000)
		DWL
			.transition()
			.attrTween("d",dwltween(dwlpath, 4, dwlarea))
			.duration(3000)
		Q2
			.transition()
			.attr("x1", result2.x)
			.attr("x2", result2.x)
			.attr("y1",  result2.y)
			.attr("y2", height)	
			.duration(3000)
		Q2
			.attr("opacity", 1)
		P2
			.transition()
			.attr("x1", 0)
			.attr("x2", result2.x)
			.attr("y1", result2.y)
			.attr("y2", result2.y)	
			.duration(3000)
	}
	function stage1bpause(){
		d3.select("#q2label")
			.transition()
				.duration(0)
		var p2label = d3.select("#p2label")
			.transition()
				.duration(0)
		var p1label = d3.select("#p1label")
			.transition()
				.duration(0)
		var q1label = d3.select("#q1label")
			.transition()
				.duration(0)
		mpb
			.transition()
			.duration(0)

		mpbPath
			.transition()
			   	.duration(0)

		mpbText
			.transition()
			.duration(0)
		DWL
			.transition()
			.duration(0)
		Q2
			.transition()
			.duration(0)
		P2
			.transition()	
			.duration(0)
	}
	function stage1bplay(){
		var time = mpb.attr("T")*3000
		d3.select("#q2label")
			.transition()
				.duration(3000 - time)
				.attr("dx", result2.x -5)
		var p2label = d3.select("#p2label")
			.transition()
				.duration(3000-time)
				.attr("dy", result2.y +5)
		
		if (1000 -time > 0){
		var p1label = d3.select("#p1label")
			.transition()
				.delay(1000-time)
			.attr("opacity",1)
		var q1label = d3.select("#q1label")
			.transition()
				.delay(1000-time)
			.attr("opacity",1)
}
		mpb
			.transition()
			.attr("y1", 100)
			.attr("y2", 300)
			.attr("T",1)
			.duration(3000-time)

		mpbPath
			.transition()
			   	.attr("d", "M 0,100 L 430,300")
			   	.duration(3000-time)

		mpbText
			.transition()
			.attr("dx", 360)
    		.attr("dy", -5)
			//.style("opacity", 0)
			.duration(3000-time)
		DWL
			.transition()
			.attrTween("d",dwltween(dwlpath, 4, dwlarea))
			.duration(3000-time)
		Q2
			.transition()
			.attr("x1", result2.x)
			.attr("x2", result2.x)
			.attr("y1",  result2.y)
			.attr("y2", height)	
			.duration(3000-time)
		P2
			.transition()
			.attr("x1", 0)
			.attr("x2", result2.x)
			.attr("y1", result2.y)
			.attr("y2", result2.y)	
			.duration(3000 -time)

		timeout3 =setTimeout(function(){
    				$(".button").removeClass("unclick")
    				$("#pause").addClass("unclick")
    			}, 3000-time)
	}
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

    }

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


	




