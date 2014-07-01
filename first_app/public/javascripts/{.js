$(document).ready(function(){

var oilmap = d3.map()
var $container = $('#container');

		var transformSVGPathExposed;
        function initScene() {
            // set the scene size
            var WIDTH = 1000, HEIGHT = 1000;
 
            // set some camera attributes
            var VIEW_ANGLE = 45, ASPECT = WIDTH / HEIGHT, NEAR = 0.1, FAR = 10000;
 
            // create a WebGL renderer, camera, and a scene
            renderer = new THREE.WebGLRenderer({antialias:true});
            camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT,
                                                  NEAR, FAR);
            scene = new THREE.Scene();
 
            // add and position the camera at a fixed position
            scene.add(camera);
            camera.position.z = 550;
            camera.position.x = 0;
            camera.position.y = 550;
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
            var planeMat = new THREE.MeshLambertMaterial({color: 0x666699});
            var plane = new THREE.Mesh(planeGeo, planeMat);
 
            // rotate it to correct position
            plane.rotation.x = -Math.PI/2;
            scene.add(plane);
            $container.append(renderer.domElement);
        }
  	initScene()
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
geo = new geons.geoConfig()
queue()
	.defer(d3.json, "/mapdata/world4.json")
	.defer(d3.tsv, "/mapdata/oil_producers.tsv", function(d) { oilmap.set(d.id, +d.mt)})
	.await(ready);

	function ready(error, world){
		data = topojson.feature(world, world.objects.countries).features
		// add the loaded gis object (in geojson format) to the map
      function addGeoObject() {
          // keep track of rendered objects
          var meshes = [];
          var averageValues = [];
          var totalValues = [];
 
 
          // keep track of min and max, used to color the objects
          var maxValueAverage = 0;
          var minValueAverage = -1;
 
          // keep track of max and min of total value
          var maxValueTotal = 0;
          var minValueTotal = -1;
 
          // convert to mesh and calculate values
          for (var i = 0 ; i < data.length ; i++) {
              var geoFeature = data[i]
              var feature = geo.path(geoFeature);
              points = feature.split("L")
              points[0] = points[0].split("M")[1]
              
              // we only need to convert it to a three.js path
              var mesh = transformSVGPath(feature);
              // for (var j =0; j<(mesh.curves.length-1); j++){
              // 	if (mesh.curves[j].v1.x == mesh.curves[j+1].v1.x && 
              // 		mesh.curves[j].v1.y == mesh.curves[j+1].v1.y){
              // 		console.log("duplicate")
              // 		console.log(i)
              // 	}
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
              	value = 1
              }
              if (value > maxValueTotal) maxValueTotal = value;
              if (value < minValueTotal || minValueTotal == -1) minValueTotal = value;
              totalValues.push(value);
          }
          // we've got our paths now extrude them to a height and add a color
          for (var i = 0 ; i < meshes.length ; i++) {
          	//console.log(i)
          	//console.log(meshes[i].extractPoints().shape)
 
              // create material color based on average
              // var scale = ((averageValues[i] - minValueAverage) / (maxValueAverage - minValueAverage)) * 255;
              // var mathColor = gradient(Math.round(scale),255);
              var material = new THREE.MeshLambertMaterial({color: 0x00ff00})
              //     color: mathColor
              // });
 
              // create extrude based on total
              //var extrude = ((totalValues[i] - minValueTotal) / (maxValueTotal - minValueTotal)) * 100;
              var rectGeom = new THREE.ShapeGeometry( meshes[i] )
              var shape3d = meshes[i].extrude({amount: Math.round(20), bevelEnabled: false});
              for (var j = 0; j <(shape3d.vertices-1);j++)
 
              // create a mesh based on material and extruded shape
              var toAdd = new THREE.Mesh(shape3d, material);
 
              // rotate and position the elements nicely in the center
              //toAdd.rotation.y = 2*Math.PI/2;
              // toAdd.translateX(-490);
              // toAdd.translateZ(50);
              toAdd.translateX(-500);
 
              // add to scene
              scene.add(toAdd);
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
    addGeoObject()
    renderer.render(scene,camera)
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
