var margin = {top: 2, right: 2, bottom: 2, left: 2}
width = document.getElementById('GlassManufacturingCanvasDiv').offsetWidth - margin.left - margin.right
console.log("width :",width)
height = window.innerHeight - margin.top - margin.bottom 

var projection = d3.geoMercator().translate([width/2, height/2]);
var path = d3.geoPath().projection(projection);

var MyCountries = ["Peru","Ecuador","Argentina","Brazil","Mexico","Chile","Colombia","United States of America","Canada","Portugal","Italy"]




var svg = d3.select("#map")
  .attr("width", width)
  .attr("height", height)
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tooltip = d3.select("body").append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "gray")
  .style("border", "solid")
  .style("border-width", "1px")
  .style("border-radius", "5px")
  .style("padding", "10px")

Promise.all([
  //d3.json("/static/neighborhood_boundaries.json")
  d3.json("/static/world_countries.json")
]).then(values => createMap(values[0].features));

function createMap(worldfeatures) {

  console.log(worldfeatures)
  
  
  
  svg.append("g").attr("id", "neighboorhoods")
    .attr("transform", "scale(1.2)")
    .selectAll("path")
    .data(worldfeatures)
    .enter()
    .append("path")
    .attr("class","country")
    .attr("d", path)
    .attr("fill", function(d){ 
        //console.log(gameDataFiltered);
        
        if(MyCountries.includes(d.properties.name)){
            
            return "blue"
            
        }else{
            return "grey"
        }
        
    })
    .on("mouseover", function(event,d) {
      tooltip.transition()
        .duration(200)
        .style("opacity", .5);
      })
      .on("mousemove", function(event,d) {

        tooltip.html("<p>"+d.properties.name+"<br></p>")
          .style("left", (event.pageX) + "px")
          .style("top", (event.pageY - 2) + "px");
        })
    .on('mouseout', tooltip.transition().duration(200).style("opacity", 0))
  ;
  
  // From https://www.d3indepth.com/zoom-and-pan/:
}
