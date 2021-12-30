var margin = {top: 2, right: 2, bottom: 2, left: 2}
//width = document.getElementById('GlassManufacturingCanvasDiv').offsetWidth - margin.left - margin.right
width = (window.innerWidth > 0) ? document.getElementById('GlassManufacturingCanvasDiv').offsetWidth : screen.width
height = document.getElementById('GlassManufacturingCanvasDiv').offsetWidth - margin.top - margin.bottom 

device_wdt = (window.innerWidth > 0) ? window.innerWidth : screen.width

var projection = d3.geoMercator().translate(device_wdt > 601 ? [width*3/5,height*2/5] : [width*3*3/5,height*3*2/5]);
var path = d3.geoPath().projection(projection);

var MyCountries = ["Peru","Ecuador","Argentina","Brazil","Mexico","Chile","Colombia","United States of America","Canada","Portugal","Italy"]




var svg = d3.select("#map")
  .attr("width", width)
  .attr("height", height)
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tooltip = d3.select("body").append("div")
  .style("opacity", 0)
  .attr("class", "tooltip w3-white")
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
    .attr("transform", device_wdt > 601 ? "scale(1.5)" : "scale(0.5)")
    .selectAll("path")
    .data(worldfeatures)
    .enter()
    .append("path")
    .attr("class","country")
    .attr("d", path)
    .attr("fill", function(d){ 
        return MyCountries.includes(d.properties.name) ? "teal" :  "grey"
        }        
    )
    .on("mouseover", function(event,d) {
      tooltip.transition()
        .duration(200)
        .style("opacity", .9);
      })
      .on("mousemove", function(event,d) {

        tooltip.html(CreateToolTipHtml(d))
          .style("left", (event.pageX) + "px")
          .style("top", (event.pageY - 2) + "px");
        })
    .on('mouseout', function(event,d)
    {
      console.log("mouse out")
      tooltip.transition()
      .duration(200)
      .style("opacity", 0)
    }
    )
  ;

  function CreateToolTipHtml(country_feature){
    return "<p class=\"w3-text-grey\">"+country_feature.properties.name+"<br></p>"
    // pending to read file with info about projects (i.e. scv) and maybe add interactivty/animations to 
    //display graphically the information.
  }
  
  // From https://www.d3indepth.com/zoom-and-pan/:
}
