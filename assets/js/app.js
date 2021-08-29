// @TODO: YOUR CODE HERE!

var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr("class", "chart");

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Create Graph

//Read the data
d3.csv("assets/data/data.csv").then(censusdata => {

    // Take your two variables from the csv
    censusdata.forEach(data => {
        data.poverty = +data.poverty;
        data.income =  +data.income;
    });

    // Initial axis params
    var xaxis = "income";
    var yaxis = "poverty";

    // X and Y axis scales
    var xScale = d3.scaleLinear().range([0, width]);
    var yScale = d3.scaleLinear().range([height, 0]);
});





// , function(data) {

//   // Add X axis
//   var x = d3.scaleLinear()
//     .domain([0, 4000])
//     .range([ 0, width ]);
//   svg.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x));

//   // Add Y axis
//   var y = d3.scaleLinear()
//     .domain([0, 500000])
//     .range([ height, 0]);
//   svg.append("g")
//     .call(d3.axisLeft(y));

//   // Add dots
//   svg.append('g')
//     .selectAll("dot")
//     .data(data)
//     .enter()
//     .append("circle")
//       .attr("cx", function (d) { return x(d.GrLivArea); } )
//       .attr("cy", function (d) { return y(d.SalePrice); } )
//       .attr("r", 1.5)
//       .style("fill", "#69b3a2")

// })