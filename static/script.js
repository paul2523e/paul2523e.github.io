const outerWidth = 1100;
const outerHeight = 800;
const margin = {left: 0, top: 0, right: 0, bottom: 0};
const width = outerWidth - margin.left - margin.right;
const height = outerHeight - margin.top - margin.bottom;

var projection = d3.geoMercator();
var path = d3.geoPath().projection(projection);

Promise.all([
  d3.json("/static/neighborhood_boundaries.json")
]).then(values => createMap(values[0]));

function createMap(neighborhoods) {

  var svg = d3.select("#map")
  .attr("width", outerWidth)
  .attr("height", outerHeight)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var geojson = topojson.feature(neighborhoods, neighborhoods.objects["Boundaries - Neighborhoods"]);
  projection.fitExtent([[margin.left, margin.top], [width, height]], geojson);


  
  
  svg.append("g").attr("id", "neighboorhoods").selectAll("path")
    .data(geojson.features)
    .enter()
    .append("path")
    .style("fill", function (d) {
      return "LightGray";
    }).style("stroke", "black").style("stroke-width", 0.5)
    .attr("d", path);
  ;
  
  // From https://www.d3indepth.com/zoom-and-pan/:
}
