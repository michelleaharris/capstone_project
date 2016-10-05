var width = 491,
	    height = 600;

	//Map projection
	var projection = d3.geo.conicEqualArea()
	    .scale(86238.13878495796)
	    .center([-87.44444903898102,41.96763306161012]) //projection center
	    .parallels([41.64454312227482,42.02303858698943]) //parallels for conic projection
	    .rotate([87.44444903898102]) //rotation for conic projection
	    .translate([-81246.30831568081,-45553.01504500934]) //translate to center the map in view

	//Generate paths based on projection
	var path = d3.geo.path()
	    .projection(projection);

	//Create an SVG
	var svg = d3.select(".chi").append("svg")
	    .attr("width", width)
	    .attr("height", height)
	    .attr("align","center");

	//Group for the map features
	var features = svg.append("g")
	    .attr("class","features");

	//Create choropleth scale
	var color = d3.scale.quantize()
	    .domain([7.449,13.146])
	    .range(d3.range(7).map(function(i) { return "q" + i + "-7"; }));

	//Create zoom/pan listener
	//Change [1,Infinity] to adjust the min/max zoom scale
	var zoom = d3.behavior.zoom()
	    .scaleExtent([1, Infinity])
	    .on("zoom",zoomed);

	svg.call(zoom);

	//Create a tooltip, hidden at the start
	var tooltippy = d3.select(".chi").append("div").attr("class","tooltippy");

	d3.json("/static/boundaries3.geojson",function(error,geodata) {
	  if (error) return console.log(error); //unknown error, check the console

	  //Create a path for each map feature in the data
	  features.selectAll("path")
	    .data(geodata.features)
	    .enter()
	    .append("path")
	    .attr("d",path)
	    .attr("class", function(d) { return (typeof color(d.properties.perimeter) == "string" ? color(d.properties.perimeter) : ""); })
	    .on("mouseover",showTooltip)
	    .on("mousemove",moveTooltip)
	    .on("mouseout",hideTooltip)
	    .on("click",clicked);

	});

	// Add optional onClick events for features here
	// d.properties contains the attributes (e.g. d.properties.name, d.properties.population)
	function clicked(d,i) {

	}


	//Update map on zoom/pan
	function zoomed() {
	  features.attr("transform", "translate(" + zoom.translate() + ")scale(" + zoom.scale() + ")")
	      .selectAll("path").style("stroke-width", 1 / zoom.scale() + "px" );
	}


	//Position of the tooltip relative to the cursor
	var tooltipOffset = {x: -70, y: -250};

	//Create a tooltip, hidden at the start
	function showTooltip(d) {
	  moveTooltip();

	  tooltippy.style("display","block")
	      .text(d.properties.community);
	}

	//Move the tooltip to track the mouse
	function moveTooltip() {
	  tooltippy.style("top",(d3.event.pageY+tooltipOffset.y)+"px")
	      .style("left",(d3.event.pageX+tooltipOffset.x)+"px");
	}

	//Create a tooltip, hidden at the start
	function hideTooltip() {
	  tooltippy.style("display","none");
	}