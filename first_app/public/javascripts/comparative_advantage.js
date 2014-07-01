$(document).ready(function(){

var oilmap = d3.map()
var $container = $('#container');

		var transformSVGPathExposed;
		var WIDTH = 800, HEIGHT = 400;
		var pastname, name, color, pastcolor 
		//var WIDTH = window.innerWidth;
		//var HEIGHT = window.innerHeight;
		objects = []
        function initScene() {
            // set the scene size
            //var WIDTH = 800, HEIGHT = 400;
 
            // set some camera attributes
            var VIEW_ANGLE = 45, ASPECT = WIDTH / HEIGHT, NEAR = 0.1, FAR = 10000;
 
            // create a WebGL renderer, camera, and a scene
            renderer = new THREE.WebGLRenderer({antialias:true});
            camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT,
                                                  NEAR, FAR);
            scene = new THREE.Scene();
            projector = new THREE.Projector(); 
 
            // add and position the camera at a fixed position
            scene.add(camera);
            camera.position.z = 450//50*.75;
            camera.position.x = 0;
            camera.position.y = 450//950*.75;
            camera.lookAt( scene.position );
 
            // start the renderer, and black background
            renderer.setSize(WIDTH, HEIGHT);
            renderer.setClearColor(0x000);
 
            // add the render target to the page
            //$("#chart").append(renderer.domElement);
 
            // add a light at a specific position
            var pointLight = new THREE.PointLight(0xFFFFFF);
            pointLight.position.x = 800;
            pointLight.position.y = 800;
            pointLight.position.z = 800;
            scene.add(pointLight);
 
            // add a base plane on which we'll render our map
            var planeGeo = new THREE.PlaneGeometry(10000, 10000, 10, 10);
            var planeMat = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
            var plane = new THREE.Mesh(planeGeo, planeMat);
 
            // rotate it to correct position
            plane.rotation.x = -Math.PI/2;
            scene.add(plane);
            $container.append(renderer.domElement);

            //Mouse events
            document.addEventListener( 'mousemove', onMouseMove, false );
        function onMouseMove( event ){
        mousex = event.clientX
   		mousey = event.clientY
   		var left = $("#container").offset().left
   		var right = left + WIDTH
   		//need to fix top??????
   		var top = $("#container").offset().top -30
   		//console.log(top)
   		var bottom = top + HEIGHT
   		//console.log("left: "+ left +" , right: "+right)
   		//console.log("top: "+ top +" , bottom: "+bottom)
   		if (mousex <= right && mousex >= left && 
   			mousey <= bottom && mousey >= top){
   			inx = mousex - left;
   			iny = mousey - top;
   			//console.log("inx : "+inx+" ,iny: "+iny)

   			var vector = new THREE.Vector3( (inx/WIDTH)*2-1, -(iny/HEIGHT)*2+1, .5 );
   			// var vector = new THREE.Vector3(
      //               ( event.clientX / window.innerWidth ) * 2 - 1,
      //             - ( event.clientY / window.innerHeight ) * 2 + 1,
      //               0.5
      //           );
        	projector.unprojectVector( vector, camera );
        	//console.log(vector.sub(camera.position))
        //console.log(objects)
        var ray = new THREE.Raycaster( camera.position, 
                                         vector.sub( camera.position ).normalize() );
        var intersects = ray.intersectObjects( objects );

        if ( intersects.length > 0 ) {
        	
        	console.log("intersect")
        	if (name)
        		pastname = name;
        		pastcolor = color;
        	name= intersects[0].object.name
        	scene.remove(labels[pastname])
        	scene.add(labels[name])
        	console.log(intersects[0].object)
        	for (var a = 0; a< objects.length;a++){
        		if (pastcolor){
        			if (objects[a].name == pastname){
        				//console.log(pastcolor)
        				objects[a].material.color.setHex(pastcolor)	
        			}
        		}
        		if (objects[a].name == name){
        			color = objects[a].material.color.getHex()
        			//console.log(color)
        			objects[a].material.color.setHex(0x99FF00)
        		}
        	}
        	renderer.render(scene, camera)
        	//intersects[0].object.material.color.setHex(0x99FF00 );
        }
   		}
        }
}
  	initScene()
  function makeTextSprite( country, value, percent, parameters )
{
	if ( parameters === undefined ) parameters = {};

	var fontface = parameters.hasOwnProperty("fontface") ? 
		parameters["fontface"] : "Arial";

	var fontsize = parameters.hasOwnProperty("fontsize") ? 
		parameters["fontsize"] : 18;

	var borderThickness = parameters.hasOwnProperty("borderThickness") ? 
		parameters["borderThickness"] : 0;

	var borderColor = parameters.hasOwnProperty("borderColor") ?
		parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };

	var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
		parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };

	//var spriteAlignment = THREE.SpriteAlignment.topLeft;
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	context.font = "Bold " + fontsize + "px " + fontface;
    
	// get size data (height depends only on font size)
	var metrics1 = context.measureText( country );
	var metrics2 = context.measureText( value );
	var metrics3 = context.measureText( percent );
	if (metrics1.width > metrics2.width && metrics1.width > metrics3.width ){
		var textWidth = metrics1.width;
	}else if (metrics2.width > metrics1.width && metrics2.width > metrics3.width){
		var textWidth = metrics2.width;
	}else{
		var textWidth = metrics3.width;
	}
	
	//console.log("textWidth "+textWidth)
	// background color
	context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
								  + backgroundColor.b + "," + backgroundColor.a + ")";
	// border color
	context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
								  + borderColor.b + "," + borderColor.a + ")";

	context.lineWidth = borderThickness;
	roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4*3 + borderThickness, 10);
	// 1.4 is extra height factor for text below baseline: g,j,p,q.

	// text color
	context.fillStyle = "rgba(0, 0, 0, 1.0)";

	context.fillText( country, borderThickness, fontsize + borderThickness);
	context.fillText( value, borderThickness, 2*fontsize + borderThickness);
	context.fillText( percent, borderThickness, 3*fontsize + borderThickness);

	// canvas contents will be used for a texture
	var texture = new THREE.Texture(canvas) 
	texture.needsUpdate = true;

	var spriteMaterial = new THREE.SpriteMaterial( 
		{ map: texture, useScreenCoordinates: false} );
	var sprite = new THREE.Sprite( spriteMaterial );
	sprite.scale.set(100,60,1.0);
	return sprite;	
}
function roundRect(ctx, x, y, w, h, r) 
{
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
    ctx.fill();
	ctx.stroke();   
}
        // var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
        // projector.unprojectVector( vector, camera );
        // var ray = new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() );

        // var intersects = ray.intersectObjects( scene.children );

        // if ( intersects.length > 0 )
        // {
        //     console.log(INTERSECTED.name);
        //     if(INTERSECTED.name == "cube")
        //     {
        //         page("real");
        //     }
        
    
 var appConstants  = {
TRANSLATE_0 : -360,
TRANSLATE_1 : 10040,
SCALE : 60000
 }

var geons = {};
  	geons.geoConfig = function() {
    this.TRANSLATE_0 = appConstants.TRANSLATE_0;
    this.TRANSLATE_1 = appConstants.TRANSLATE_1;
    this.SCALE = appConstants.SCALE;
 
    this.mercator = d3.geo.mercator();
    this.path = d3.geo.path().projection(this.mercator);
 
    this.setupGeo = function() {
        var translate = this.mercator.translate();
        translate[0] = this.TRANSLATE_0;
        translate[1] = this.TRANSLATE_1;
 
        this.mercator.translate(translate);
        this.mercator.scale(this.SCALE);
    }
}
datas = {}
centroids = {}
labels ={}
geo = new geons.geoConfig()
queue()
	.defer(d3.json, "/mapdata/world4.json")
	.defer(d3.tsv, "/mapdata/oil_producers.tsv", function(d) { 
		datas[d.id] = [d.mt, d.percent, d.name]
		oilmap.set(d.id, +d.percent)})
	.await(ready);

	function ready(error, world){
		//console.log(datas)
		data = topojson.feature(world, world.objects.countries).features
		//console.log(data[0])
		//console.log(d3.path.centroid(data[1]))
		// add the loaded gis object (in geojson format) to the map
      function addGeoObject() {
          // keep track of rendered objects
          var meshes = [];
          var averageValues = [];
          var totalValues = [];
          var countries = [];
  
          // keep track of min and max, used to color the objects
          var maxValueAverage = 0;
          var minValueAverage = -1;
 
          // keep track of max and min of total value
          var maxValueTotal = 0;
          var minValueTotal = -1;
          // convert to mesh and calculate values
          for (var i = 0 ; i < data.length ; i++) {
          	var multiple = false
          	console.log("first i: "+ i)
              var geoFeature = data[i]
              country = geoFeature.id
              var feature = geo.path(geoFeature);
              //console.log(feature.centroid(geoFeature))
              paths = feature.split("M")
              if (paths.length > 2){
              for (var p=1; p <paths.length;p++){
              	console.log("multiple")
              	multiple = true
              	newfeature = "M" + paths[p]
              	newmesh = transformSVGPath(newfeature)
              	meshes.push(newmesh)
              	var value = parseInt(oilmap.get(geoFeature.id));
              if (!value){
              	value = 0
              }
              if (value > maxValueTotal) maxValueTotal = value;
              if (value < minValueTotal || minValueTotal == -1) minValueTotal = value;
              totalValues.push(value);
              countries.push(country)
              }}
              points1 = feature.split("L")
              points1[0] = points1[0].split("M")[1]
              //if (i==1){console.log(points1)}
              
              // we only need to convert it to a three.js path
              if (!multiple){
              	var mesh = transformSVGPath(feature);
              //console.log(mesh.curves[0])
          //     if (i==4){
          //     	for (var k =0; k < mesh.curves.length; k++){
          //     	console.log(k)
          //     	console.log(mesh.curves[k].v1)
          //     	console.log(mesh.curves[k].v2)
          //     }
          // }
              //console.log(mesh.curves[0].v1)
              //console.log(mesh.curves[0].v2)
              // points = mesh.extractPoints().shape
              // if (i==1){console.log(points)}
              // //console.log(mesh.curves.length)
              // pastxs = []
              // pastys = []
              // for (var j =0; j<(points.length-1); j++){
              // 	if (pastxs.indexOf(points[j].x) >= 0 && 
              // 		pastys[pastxs.indexOf(points[j].x)] == points[j].y
              // 		){
              // 		console.log(points[j].x)
              // 		console.log("j:" + j)
              // 		//if(j>0 && j< mesh.curves.length){mesh.curves[j-1].v2.x += 1}
              // 		console.log("duplicate mesh")
              // 		console.log("i:" +i)
              // 	}
              // 	pastxs.push(points[j].x)
              // 	pastys.push(points[j].y)
              // 	}
              
              // add to array
              meshes.push(mesh);
 
              // we get a property from the json object and use it
              // to determine the color later on
              // var value = parseInt(geoFeature.properties.bev_dichth);
              // if (value > maxValueAverage) maxValueAverage = value;
              // if (value < minValueAverage || minValueAverage == -1) minValueAverage = value;
              // averageValues.push(value);
 
              // and we get the max values to determine height later on.
              var value = parseInt(oilmap.get(geoFeature.id));
              if (!value){
              	value = 0
              }
              if (value > maxValueTotal) maxValueTotal = value;
              if (value < minValueTotal || minValueTotal == -1) minValueTotal = value;
              totalValues.push(value);
              countries.push(country);
          }
      }
      //console.log(countries)
          // we've got our paths now extrude them to a height and add a color
          for (var i = 0 ; i < meshes.length ; i++) {
          	//console.log(i)
          	//console.log(meshes[i].extractPoints().shape)
 
              // create material color based on average
              // var scale = ((averageValues[i] - minValueAverage) / (maxValueAverage - minValueAverage)) * 255;
              
              // bad = [1,4,6,8,10,17, 27,29,30,43,53,55,57,64,72,79,82,111,118,120,121,125,126,135,142,162,168,172,174]
              // if (bad.indexOf(i) >= 0){
              // 	mathColor = 0xFF0000
              // }
              color= [0x88D4D9,0x70AD3F, 0xA64D50, 0xF2DF7E, 0x35737F]
              if (totalValues[i] != 0){
              	var mathColor = color[countries[i]%5];
              }else{
              mathColor = 0x818DBF	
              }
              var material = new THREE.MeshLambertMaterial({color: mathColor})
              //     color: mathColor
              // });
 
              // create extrude based on total
              if (totalValues[i]==0){
              	extrude = 2
              }
              else{
              	extrude = totalValues[i]/maxValueTotal *40
              }
              points= meshes[i].extractPoints().shape
              //if (i==236) console.log(points)
              // if (i<2){
              // 	for (var j = 0; j<points.length;j++){
              // 		console.log(points[j])
              // 	}
              	
              // }
              //var rectGeom = new THREE.ShapeGeometry( meshes[i] )
              console.log(i)
              console.log(extrude)
              var shape3d = meshes[i].extrude({amount: Math.round(extrude), bevelEnabled: false});
              
              // pastxs = []
              // pastys = []
              // pastzs = []
              // for (var j = 0; j <(shape3d.vertices.length-1); j++){
              // 	if (pastxs.indexOf(shape3d.vertices[j].x) >= 0 && pastys.indexOf(shape3d.vertices[j].y) >= 0 && 
              // 		(pastys[pastxs.indexOf(shape3d.vertices[j].x)]== shape3d.vertices[j].y &&
              // 		 pastzs[pastxs.indexOf(shape3d.vertices[j].x)]== shape3d.vertices[j].z)){
              // 		console.log("duplicate")
              // 		shape3d.vertices[j].x += 1
              // 	}
              // 	pastxs.push(shape3d.vertices[j].x) 
              // 	pastys.push(shape3d.vertices[j].y)
              // 	pastzs.push(shape3d.vertices[j].z)
              // }
 			
              // create a mesh based on material and extruded shape
              var toAdd = new THREE.Mesh(shape3d, material);
              toAdd.name = countries[i]
              //toAdd.opacity = .6
 
              // rotate and position the elements nicely in the center
              toAdd.rotation.x = 1*Math.PI/2;
              toAdd.rotation.z = 4*Math.PI/2;
              //toAdd.rotation.y = 1*Math.PI/4;
              // toAdd.translateX(-490);
              toAdd.translateZ(-50);
              toAdd.translateZ(-extrude)
              toAdd.translateX(-550);
              toAdd.translateY(-200);
 
              // add to scene
              scene.add(toAdd);
              if (totalValues[i]!= 0){
              	centroid = getCentroid(toAdd)
              	console.log(centroid)
              	if (!centroids[countries[i]]) centroids[countries[i]] = []
              	centroids[countries[i]].push(centroid)
              	objects.push(toAdd)
              }
          }
      }
     positions = {682:{x: 25, y:100, z:-25}, 643:{x:200, y:100, z:-100}, 840:{x: -300, y:100, z:0}, 156:{x: 210, y:100, z:20}, 
     364:{x: 100, y:100, z:-25}, 124:{x: -250, y:150, z:-70}, 784:{x: 100, y:120, z:25}, 862:{x: -200, y:100, z:60},
 	414:{x: 80, y:100, z:-25}, 368:{x: 80, y:100, z:-25}}
 	function addLabels() {
 		console.log(Object.keys(datas))
 		for (var i in datas){
 			maxj = 0
 			for (var j = 0; j< centroids[i].length;j++){
 				if (centroids[i][maxj].v < centroids[i][j].v) maxj = j
 			}
 			console.log(maxj)
 			var spritey = makeTextSprite( datas[i][2]+ ":", datas[i][0]+" Mts", datas[i][1]+" %", 
			{ fontsize: 44, fontface: "Georgia", borderColor: {r:0, g:0, b:0, a:0}, backgroundColor:{r:255,g:255,b:255,a:0.6} } );
			spritey.position.set(positions[i].x,positions[i].y,positions[i].z);
			labels[i] = spritey
			//scene.add( spritey );
 		}
 	}
        // simple gradient function
        function gradient(length, maxLength) {
 
            var i = (length * 255 / maxLength);
            var r = i;
            var g = 255-(i);
            var b = 0;
 
            var rgb = b | (g << 8) | (r << 16);
            return rgb;
        }
        function getCentroid( mesh ) {

		    mesh.geometry.computeBoundingBox();
		    boundingBox = mesh.geometry.boundingBox;

		    var x0 = boundingBox.min.x;
		    var x1 = boundingBox.max.x;
		    var y0 = boundingBox.min.y;
		    var y1 = boundingBox.max.y;
		    var z0 = boundingBox.min.z;
		    var z1 = boundingBox.max.z;


		    var bWidth = ( x0 > x1 ) ? x0 - x1 : x1 - x0;
		    var bHeight = ( y0 > y1 ) ? y0 - y1 : y1 - y0;
		    var bDepth = ( z0 > z1 ) ? z0 - z1 : z1 - z0;

		    var centroidX = x0 + ( bWidth / 2 ) + mesh.position.x;
		    var centroidY = y0 + ( bHeight / 2 )+ mesh.position.y;
		    var centroidZ = z0 + ( bDepth / 2 ) + mesh.position.z;
		    var volume = bWidth*bHeight*bDepth

		    return mesh.geometry.centroid = { x : centroidX, y : centroidY, z : centroidZ , v: volume};

		}
		function changePerspective(){
			var tween = new TWEEN.Tween(camera.position).to({
		    x: 0,
		    y: 950*.75,
		    z: 50*.75
		}, 5000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
		    camera.lookAt(scene.position);
		}).onUpdate(function () {
			console.log(camera.position)
		    renderer.render(scene,camera)
		})
		tween.start()
				}

    addGeoObject()
    addLabels()
    renderer.render(scene,camera)
    TWEEN.update()
	}

  	

//working example of data and map integration
// var width = 1000,
//     height = 1000;

// var oilmap = d3.map()

// var projection = d3.geo.mercator()
// 	.scale(100)

// var path = d3.geo.path()
//     .projection(projection);

// var svg = d3.select("body").append("svg")
//     .attr("width", width)
//     .attr("height", height);

// queue()
// 	.defer(d3.json, "/mapdata/world4.json")
// 	.defer(d3.tsv, "/mapdata/oil_producers.tsv", function(d) { oilmap.set(d.id, +d.mt)})
// 	.await(ready);

// function ready(error, world){
// console.log()
// svg.append("g")
//       .attr("class", "counties")
//     .selectAll("path")
//     .data(topojson.feature(world, world.objects.countries).features)
//     .enter().append("path")
//     .attr("class", function(d) {console.log(oilmap.get(d.id))
//     	if (oilmap.get(d.id)){
//       	return "topproducers"
//       }else{
//       	return "other"
//       } })
//     .attr("d", path);
// }

//fail
/*var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);
var colors = ["pink", "steelblue", "purple", "orange"]

var projection = d3.geo.mercator()
    .scale(248);

var canvas = d3.select("body").append("canvas")
    .attr("width", width)
    .attr("height", height);

var c = canvas.node().getContext("2d");

var path = d3.geo.path()
    .projection(projection)
    .context(c);

queue()
	.defer(d3.json, "/mapdata/world4.json")
	.defer(d3.tsv, "/mapdata/oil_producers.tsv")
	.await(ready)

function ready(error, world, oil){
canvas	
	.selectAll("path")
	.data(topojson.feature(world, world.objects.countries)
		.features)
	.enter()
	.append("path")
	.attr("d", path)
	.style("fill", function(d,i){console.log(i)
		return  colors[i%4]})
}*/

//without oil data
/*d3.json("/mapdata/world4.json", function(data) {
  console.log(data.objects.countries)

var path = d3.geo.path()
	.projection(d3.geo.mercator())

svg.append("g")
	.selectAll("path")
	.data(topojson.feature(data, data.objects.countries)
		.features)
	.enter()
	.append("path")
	.attr("d", path)
	.style("fill", function(d,i){return  colors[i%4]})*/



  //world2.json
// var path = d3.geo.path()
//         .projection(d3.geo.mercator()
//         	.scale(900)
//         	.translate([width/2, height/2 -50]))
// svg.append("g")
//         .attr("class", "black")
//         .selectAll("path")
//         .data(data.features)
//         .enter()
//         .append("path")
//         .attr("d", path)
//         .style("fill", function(d,i){return colors[i%4]})


});
